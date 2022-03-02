package praktikum.diplomski.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import praktikum.diplomski.models.AccountData;
import praktikum.diplomski.models.ForumMessage;
import praktikum.diplomski.models.Review;
import praktikum.diplomski.services.AccountDataService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/accountdata")
public class AccountDataController {
	@Autowired
	AccountDataService accountDataService;

	@JsonView(HideOptionalProperties.class)
	@RequestMapping()
	public ResponseEntity<Iterable<AccountData>> getAccountData() {
		return new ResponseEntity<Iterable<AccountData>>(accountDataService.getAccountData(), HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<AccountData> getAccountDataById(@PathVariable Long id) {
		Optional<AccountData> accountData = accountDataService.getAccountDataById(id);
		if (accountData.isPresent()) {
			return new ResponseEntity<AccountData>(accountData.get(), HttpStatus.OK);
		}
		return new ResponseEntity<AccountData>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<AccountData> addAccountData(@RequestBody AccountData AccountData) {
		accountDataService.addAccountData(AccountData);
		return new ResponseEntity<AccountData>(AccountData, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<AccountData> updateAccountData(@PathVariable Long id, @RequestBody AccountData AccountData) {
		accountDataService.updateAccountData(id, AccountData);
		return new ResponseEntity<AccountData>(AccountData, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<AccountData> removeAccountData(@PathVariable Long id) {
		try {
			accountDataService.removeAccountData(id);
		} catch (Exception e) {
			return new ResponseEntity<AccountData>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<AccountData>(HttpStatus.NO_CONTENT);
	}
	
    @JsonView(HideOptionalProperties.class)
    @RequestMapping(value="/review/{accountId}", method=RequestMethod.GET)
    public ResponseEntity<ArrayList<Review>> getAccountReviews(@PathVariable Long accountId) {
        return new ResponseEntity<ArrayList<Review>>(accountDataService.getAccountReviews(accountId), HttpStatus.OK);
    }
    
	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/forummessages/{accountDataId}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<ForumMessage>> getForumMessages(@PathVariable Long accountDataId) {
		return new ResponseEntity<ArrayList<ForumMessage>>(accountDataService.getForumMessages(accountDataId), HttpStatus.OK);
	}
	
	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/username/{username}", method = RequestMethod.GET)
	public ResponseEntity<AccountData> getAccountDataByUsername(@PathVariable String username) {
		Optional<AccountData> accountData = accountDataService.getAccountDataByUserName(username);
		if (accountData.isPresent()) {
			return new ResponseEntity<AccountData>(accountData.get(), HttpStatus.OK);
		}
		return new ResponseEntity<AccountData>(HttpStatus.NOT_FOUND);
	}
    
}
