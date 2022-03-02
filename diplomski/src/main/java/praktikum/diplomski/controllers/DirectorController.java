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

import praktikum.diplomski.models.Director;
import praktikum.diplomski.models.Film;
import praktikum.diplomski.services.DirectorService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/director")
public class DirectorController {

	@Autowired
	DirectorService directorService;

	@JsonView(HideOptionalProperties.class)
	@RequestMapping()
	public ResponseEntity<Iterable<Director>> getDirectors() {
		return new ResponseEntity<Iterable<Director>>(directorService.getDirectors(), HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Director> getDirectorById(@PathVariable Long id) {
		Optional<Director> director = directorService.getDirectorById(id);
		if (director.isPresent()) {
			return new ResponseEntity<Director>(director.get(), HttpStatus.OK);
		}
		return new ResponseEntity<Director>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Director> updateDirector(@PathVariable Long id, @RequestBody Director Director) {
		directorService.updateDirector(id, Director);
		return new ResponseEntity<Director>(Director, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Director> removeDirector(@PathVariable Long id) {
		try {
			directorService.removeDirector(id);
		} catch (Exception e) {
			return new ResponseEntity<Director>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Director>(HttpStatus.NO_CONTENT);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/findByName/{name}", method = RequestMethod.GET)
	public ResponseEntity<Iterable<Optional<Director>>> getDirectorsByFirstName(@PathVariable String firstName) {
		Iterable<Optional<Director>> director = directorService.getDirectorsByFirstName(firstName);
		return new ResponseEntity<Iterable<Optional<Director>>>(director, HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/findByLastName/{name}", method = RequestMethod.GET)
	public ResponseEntity<Iterable<Optional<Director>>> getDirectorsByLastName(@PathVariable String lastName) {
		Iterable<Optional<Director>> director = directorService.getDirectorsByLastName(lastName);
		return new ResponseEntity<Iterable<Optional<Director>>>(director, HttpStatus.OK);
	}

    @JsonView(HideOptionalProperties.class)
    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<Director> addDirector(@RequestBody Director Director) {
        directorService.addDirector(Director);
        return new ResponseEntity<Director>(Director, HttpStatus.CREATED);
    }
    
	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/films/{directorId}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Film>> getFilms(@PathVariable Long directorId) {
		return new ResponseEntity<ArrayList<Film>>(directorService.getFilms(directorId), HttpStatus.OK);
	}

}