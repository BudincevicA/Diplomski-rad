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

import praktikum.diplomski.models.Film;
import praktikum.diplomski.models.User;
import praktikum.diplomski.services.FileService;
import praktikum.diplomski.services.UserService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	FileService fileService;

	@JsonView(HideOptionalProperties.class)
	@RequestMapping()
	public ResponseEntity<Iterable<User>> getUsers() {
		return new ResponseEntity<Iterable<User>>(userService.getUsers(), HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		Optional<User> user = userService.getUserById(id);
		if (user.isPresent()) {
			return new ResponseEntity<User>(user.get(), HttpStatus.OK);
		}
		return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/username/{username}", method = RequestMethod.GET)
	public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
		Optional<User> user = userService.getUserByUsername(username);
		if (user.isPresent()) {
			return new ResponseEntity<User>(user.get(), HttpStatus.OK);
		}
		return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	}


	
	/*@RequestMapping(value = "/{username}/likedFilms", method = RequestMethod.PUT, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<User> addLikedFilm(@PathVariable String username, @RequestPart("data") String userStr,@RequestPart("likedFilm") Film film)
			throws IOException {
		User user = new ObjectMapper().readValue(userStr, User.class);
		userService.addLikedFilm(username, user, film);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}*/

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<User> removeUser(@PathVariable Long id) {
		try {
			userService.removeUser(id);
		} catch (Exception e) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/findByName/{name}", method = RequestMethod.GET)
	public ResponseEntity<Iterable<Optional<User>>> getUsersByFirstName(@PathVariable String firstName) {
		Iterable<Optional<User>> user = userService.getUsersByFirstName(firstName);
		return new ResponseEntity<Iterable<Optional<User>>>(user, HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/findByLastName/{name}", method = RequestMethod.GET)
	public ResponseEntity<Iterable<Optional<User>>> getUsersByLastName(@PathVariable String lastName) {
		Iterable<Optional<User>> user = userService.getUsersByLastName(lastName);
		return new ResponseEntity<Iterable<Optional<User>>>(user, HttpStatus.OK);
	}

    @JsonView(HideOptionalProperties.class)
    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<User> adduser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }
    
    @RequestMapping(value="/{username}", method=RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody User user) {
        userService.updateUser(username, user);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
    
	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/films/{userId}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Film>> getFilms(@PathVariable Long userId) {
		return new ResponseEntity<ArrayList<Film>>(userService.getFilms(userId), HttpStatus.OK);
	}
	
	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/filmsdislike/{userId}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Film>> getDislikes(@PathVariable Long userId) {
		return new ResponseEntity<ArrayList<Film>>(userService.getDislikes(userId), HttpStatus.OK);
	}
    

}