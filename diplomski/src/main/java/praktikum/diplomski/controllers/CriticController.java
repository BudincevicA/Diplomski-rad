package praktikum.diplomski.controllers;

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


import praktikum.diplomski.services.FileService;

import praktikum.diplomski.models.Critic;
import praktikum.diplomski.services.CriticService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/critic")
public class CriticController {

	@Autowired
	CriticService criticService;
	
    @Autowired
    FileService fileService;

	@JsonView(HideOptionalProperties.class)
	@RequestMapping()
	public ResponseEntity<Iterable<Critic>> getCritics() {
		return new ResponseEntity<Iterable<Critic>>(criticService.getCritics(), HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Critic> getCriticById(@PathVariable Long id) {
		Optional<Critic> critic = criticService.getCriticById(id);
		if (critic.isPresent()) {
			return new ResponseEntity<Critic>(critic.get(), HttpStatus.OK);
		}
		return new ResponseEntity<Critic>(HttpStatus.NOT_FOUND);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/username/{username}", method = RequestMethod.GET)
	public ResponseEntity<Critic> getCriticByUsername(@PathVariable String username) {
		Optional<Critic> critic = criticService.getCriticByUsername(username);
		if (critic.isPresent()) {
			return new ResponseEntity<Critic>(critic.get(), HttpStatus.OK);
		}
		return new ResponseEntity<Critic>(HttpStatus.NOT_FOUND);
	}

    @RequestMapping(value="/{username}", method=RequestMethod.PUT)
    public ResponseEntity<Critic> updateCritic(@PathVariable String username, @RequestBody Critic Critic) {
        criticService.updateCritic(username, Critic);
        return new ResponseEntity<Critic>(Critic, HttpStatus.OK);
    }

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Critic> removeCritic(@PathVariable Long id) {
		try {
			criticService.removeCritic(id);
		} catch (Exception e) {
			return new ResponseEntity<Critic>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Critic>(HttpStatus.NO_CONTENT);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/findByName/{name}", method = RequestMethod.GET)
	public ResponseEntity<Iterable<Optional<Critic>>> getCriticsByFirstName(@PathVariable String firstName) {
		Iterable<Optional<Critic>> critic = criticService.getCriticsByFirstName(firstName);
		return new ResponseEntity<Iterable<Optional<Critic>>>(critic, HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/findByLastName/{name}", method = RequestMethod.GET)
	public ResponseEntity<Iterable<Optional<Critic>>> getCriticsByLastName(@PathVariable String lastName) {
		Iterable<Optional<Critic>> critic = criticService.getCriticsByLastName(lastName);
		return new ResponseEntity<Iterable<Optional<Critic>>>(critic, HttpStatus.OK);
	}

    @JsonView(HideOptionalProperties.class)
    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<Critic> addCritic(@RequestBody Critic Critic) {
        criticService.addCritic(Critic);
        return new ResponseEntity<Critic>(Critic, HttpStatus.CREATED);
    }

}