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

import praktikum.diplomski.models.Forum;
import praktikum.diplomski.models.ForumTopic;
import praktikum.diplomski.services.ForumService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/forum")
public class ForumController {

	@Autowired
	ForumService forumService;

	@JsonView(HideOptionalProperties.class)
	@RequestMapping()
	public ResponseEntity<Iterable<Forum>> getForums() {
		return new ResponseEntity<Iterable<Forum>>(forumService.getForums(), HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Forum> getForumById(@PathVariable Long id) {
		Optional<Forum> forum = forumService.getForumById(id);
		if (forum.isPresent()) {
			return new ResponseEntity<Forum>(forum.get(), HttpStatus.OK);
		}
		return new ResponseEntity<Forum>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Forum> updateForum(@PathVariable Long id, @RequestBody Forum Forum) {
		forumService.updateForum(id, Forum);
		return new ResponseEntity<Forum>(Forum, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Forum> removeForum(@PathVariable Long id) {
		try {
			forumService.removeForum(id);
		} catch (Exception e) {
			return new ResponseEntity<Forum>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Forum>(HttpStatus.NO_CONTENT);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<Forum> addForum(@RequestBody Forum Forum) {
		forumService.addForum(Forum);
		return new ResponseEntity<Forum>(Forum, HttpStatus.CREATED);
	}
	
	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/forumtopics/{forumId}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<ForumTopic>> getForumTopics(@PathVariable Long forumId) {
		return new ResponseEntity<ArrayList<ForumTopic>>(forumService.getForumTopics(forumId), HttpStatus.OK);
	}

}
