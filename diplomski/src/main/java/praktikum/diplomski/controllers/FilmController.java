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
import praktikum.diplomski.models.CriticScore;
import praktikum.diplomski.models.Film;
import praktikum.diplomski.models.Genre;
import praktikum.diplomski.models.Review;
import praktikum.diplomski.models.UserScore;
import praktikum.diplomski.services.FileService;
import praktikum.diplomski.services.FilmService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/film")
public class FilmController {
	

	@Autowired
	FilmService filmService;

	@Autowired
	FileService fileService;

	@JsonView(HideOptionalProperties.class)
	@RequestMapping()
	public ResponseEntity<Iterable<Film>> getFilms() {
		return new ResponseEntity<Iterable<Film>>(filmService.getFilms(), HttpStatus.OK);
	}

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Film> getFilmById(@PathVariable Long id) {
		Optional<Film> film = filmService.getFilmById(id);
		if (film.isPresent()) {
			return new ResponseEntity<Film>(film.get(), HttpStatus.OK);
		}
		return new ResponseEntity<Film>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Film> updateFilm(@PathVariable Long id, @RequestBody Film Film) {
		filmService.updateFilm(id, Film);
		return new ResponseEntity<Film>(Film, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Film> removeFilm(@PathVariable Long id) {
		try {
			filmService.removeFilm(id);
		} catch (Exception e) {
			return new ResponseEntity<Film>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Film>(HttpStatus.NO_CONTENT);
	}

    @JsonView(HideOptionalProperties.class)
    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<Film> addFilm(@RequestBody Film film) {
        filmService.addFilm(film);
        return new ResponseEntity<Film>(film, HttpStatus.CREATED);
    }

	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/actors/{filmId}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Actor>> getActors(@PathVariable Long filmId) {
		return new ResponseEntity<ArrayList<Actor>>(filmService.getActors(filmId), HttpStatus.OK);
	}
	
	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/genres/{filmId}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Genre>> getGenres(@PathVariable Long filmId) {
		return new ResponseEntity<ArrayList<Genre>>(filmService.getGenres(filmId), HttpStatus.OK);
	}
	
	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/reviews/{filmId}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Review>> getReviews(@PathVariable Long filmId) {
		return new ResponseEntity<ArrayList<Review>>(filmService.getReviews(filmId), HttpStatus.OK);
	}
	
	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/userscores/{filmId}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<UserScore>> getUserScores(@PathVariable Long filmId) {
		return new ResponseEntity<ArrayList<UserScore>>(filmService.getUserScores(filmId), HttpStatus.OK);
	}
	
	@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/criticscores/{filmId}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<CriticScore>> getCriticScores(@PathVariable Long filmId) {
		return new ResponseEntity<ArrayList<CriticScore>>(filmService.getCriticScores(filmId), HttpStatus.OK);
	}
	
	/*@JsonView(HideOptionalProperties.class)
	@RequestMapping(value = "/director/{filmId}", method = RequestMethod.GET)
	public ResponseEntity<Director> getDirector(@PathVariable Long filmId) {
		return new ResponseEntity<Director>(filmService.getDirector(filmId), HttpStatus.OK);
	}*/

}