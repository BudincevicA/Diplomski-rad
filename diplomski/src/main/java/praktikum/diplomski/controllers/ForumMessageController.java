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

import praktikum.diplomski.models.ForumMessage;
import praktikum.diplomski.services.ForumMessageService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/forumMessage")
public class ForumMessageController {

	@Autowired
	ForumMessageService forumMessageService;

	@JsonView(HideOptionalProperties.class)
	@RequestMapping()
	public ResponseEntity<Iterable<ForumMessage>> getForumMessages() {
		return new ResponseEntity<Iterable<ForumMessage>>(forumMessageService.getForumMessages(), HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<ForumMessage> getForumMessageById(@PathVariable Long id) {
		Optional<ForumMessage> forumMessage = forumMessageService.getForumMessageById(id);
		if (forumMessage.isPresent()) {
			return new ResponseEntity<ForumMessage>(forumMessage.get(), HttpStatus.OK);
		}
		return new ResponseEntity<ForumMessage>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<ForumMessage> updateForumMessage(@PathVariable Long id, @RequestBody ForumMessage ForumMessage) {
		forumMessageService.updateForumMessage(id, ForumMessage);
		return new ResponseEntity<ForumMessage>(ForumMessage, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<ForumMessage> removeForumMessage(@PathVariable Long id) {
		try {
			forumMessageService.removeForumMessage(id);
		} catch (Exception e) {
			return new ResponseEntity<ForumMessage>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<ForumMessage>(HttpStatus.NO_CONTENT);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<ForumMessage> addForumMessage(@RequestBody ForumMessage ForumMessage) {
		forumMessageService.addForumMessage(ForumMessage);
		return new ResponseEntity<ForumMessage>(ForumMessage, HttpStatus.CREATED);
	}

}
