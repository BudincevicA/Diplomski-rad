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

import praktikum.diplomski.models.ForumMessage;
import praktikum.diplomski.models.ForumTopic;
import praktikum.diplomski.services.ForumTopicService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/forumTopic")
public class ForumTopicController {

	@Autowired
	ForumTopicService forumTopicService;

	@JsonView(HideOptionalProperties.class)
	@RequestMapping()
	public ResponseEntity<Iterable<ForumTopic>> getForumTopics() {
		return new ResponseEntity<Iterable<ForumTopic>>(forumTopicService.getForumTopics(), HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<ForumTopic> getForumTopicById(@PathVariable Long id) {
		Optional<ForumTopic> forumTopic = forumTopicService.getForumTopicById(id);
		if (forumTopic.isPresent()) {
			return new ResponseEntity<ForumTopic>(forumTopic.get(), HttpStatus.OK);
		}
		return new ResponseEntity<ForumTopic>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<ForumTopic> updateForumTopic(@PathVariable Long id, @RequestBody ForumTopic ForumTopic) {
		forumTopicService.updateForumTopic(id, ForumTopic);
		return new ResponseEntity<ForumTopic>(ForumTopic, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<ForumTopic> removeForumTopic(@PathVariable Long id) {
		try {
			forumTopicService.removeForumTopic(id);
		} catch (Exception e) {
			return new ResponseEntity<ForumTopic>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<ForumTopic>(HttpStatus.NO_CONTENT);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<ForumTopic> addForumTopic(@RequestBody ForumTopic ForumTopic) {
		forumTopicService.addForumTopic(ForumTopic);
		return new ResponseEntity<ForumTopic>(ForumTopic, HttpStatus.CREATED);
	}
	
	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/forummessages/{forumTopicId}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<ForumMessage>> getForumMessages(@PathVariable Long forumTopicId) {
		return new ResponseEntity<ArrayList<ForumMessage>>(forumTopicService.getForumMessages(forumTopicId), HttpStatus.OK);
	}

}
