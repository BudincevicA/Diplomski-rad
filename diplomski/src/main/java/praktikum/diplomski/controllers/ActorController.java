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

import praktikum.diplomski.models.Actor;
import praktikum.diplomski.models.Film;
import praktikum.diplomski.services.ActorService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/actor")
public class ActorController {

	@Autowired
	ActorService actorService;

	@JsonView(HideOptionalProperties.class)
	@RequestMapping()
	public ResponseEntity<Iterable<Actor>> getActors() {
		return new ResponseEntity<Iterable<Actor>>(actorService.getActors(), HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Actor> getActorById(@PathVariable Long id) {
		Optional<Actor> actor = actorService.getActorById(id);
		if (actor.isPresent()) {
			return new ResponseEntity<Actor>(actor.get(), HttpStatus.OK);
		}
		return new ResponseEntity<Actor>(HttpStatus.NOT_FOUND);
	}


    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    public ResponseEntity<Actor> updateActor(@PathVariable Long id, @RequestBody Actor Actor) {
        actorService.updateActor(id, Actor);
        return new ResponseEntity<Actor>(Actor, HttpStatus.CREATED);
    }

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Actor> removeActor(@PathVariable Long id) {
		try {
			actorService.removeActor(id);
		} catch (Exception e) {
			return new ResponseEntity<Actor>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Actor>(HttpStatus.NO_CONTENT);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/findByName/{name}", method = RequestMethod.GET)
	public ResponseEntity<Iterable<Optional<Actor>>> getActorsByFirstName(@PathVariable String firstName) {
		Iterable<Optional<Actor>> actor = actorService.getActorsByFirstName(firstName);
		return new ResponseEntity<Iterable<Optional<Actor>>>(actor, HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/findByLastName/{name}", method = RequestMethod.GET)
	public ResponseEntity<Iterable<Optional<Actor>>> getActorsByLastName(@PathVariable String lastName) {
		Iterable<Optional<Actor>> actor = actorService.getActorsByLastName(lastName);
		return new ResponseEntity<Iterable<Optional<Actor>>>(actor, HttpStatus.OK);
	}

    @JsonView(HideOptionalProperties.class)
    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<Actor> addActor(@RequestBody Actor Actor) {
        actorService.addActor(Actor);
        return new ResponseEntity<Actor>(Actor, HttpStatus.CREATED);
    }
    
	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/films/{actorId}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Film>> getFilms(@PathVariable Long actorId) {
		return new ResponseEntity<ArrayList<Film>>(actorService.getFilms(actorId), HttpStatus.OK);
	}
    

}