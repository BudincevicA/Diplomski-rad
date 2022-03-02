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


import praktikum.diplomski.models.Genre;
import praktikum.diplomski.services.GenreService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/genre")
public class GenreController {

	@Autowired
	GenreService genreService;

	@JsonView(HideOptionalProperties.class)
	@RequestMapping()
	public ResponseEntity<Iterable<Genre>> getGenres() {
		return new ResponseEntity<Iterable<Genre>>(genreService.getGenres(), HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Genre> getGenreById(@PathVariable Long id) {
		Optional<Genre> genre = genreService.getGenreById(id);
		if (genre.isPresent()) {
			return new ResponseEntity<Genre>(genre.get(), HttpStatus.OK);
		}
		return new ResponseEntity<Genre>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Genre> updateGenre(@PathVariable Long id, @RequestBody Genre Genre) {
		genreService.updateGenre(id, Genre);
		return new ResponseEntity<Genre>(Genre, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Genre> removeGenre(@PathVariable Long id) {
		try {
			genreService.removeGenre(id);
		} catch (Exception e) {
			return new ResponseEntity<Genre>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Genre>(HttpStatus.NO_CONTENT);
	}


    @JsonView(HideOptionalProperties.class)
    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<Genre> addGenre(@RequestBody Genre Genre) {
        genreService.addGenre(Genre);
        return new ResponseEntity<Genre>(Genre, HttpStatus.CREATED);
    }

}