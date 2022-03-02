package praktikum.diplomski.services;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.Actor;
import praktikum.diplomski.models.CriticScore;
import praktikum.diplomski.models.Director;
import praktikum.diplomski.models.Film;
import praktikum.diplomski.models.Genre;
import praktikum.diplomski.models.Review;
import praktikum.diplomski.models.UserScore;
import praktikum.diplomski.repositories.ActorRepository;
import praktikum.diplomski.repositories.CriticScoreRepository;
import praktikum.diplomski.repositories.DirectorRepository;
import praktikum.diplomski.repositories.FilmRepository;
import praktikum.diplomski.repositories.GenreRepository;
import praktikum.diplomski.repositories.ReviewRepository;
import praktikum.diplomski.repositories.UserScoreRepository;


@Service
public class FilmService {
	@Autowired
	private FilmRepository filmRepo;
	
	@Autowired
	private ActorRepository actorRepo;
	
	@Autowired
	private GenreRepository genreRepo;
	
	@Autowired
	private ReviewRepository reviewRepo;
	
	@Autowired
	private DirectorRepository directorRepo;
	
	@Autowired
	private UserScoreRepository userScoreRepo;
	
	@Autowired
	private CriticScoreRepository criticScoreRepo;

	public FilmService() {
	}

	public Iterable<Film> getFilms() {
		return filmRepo.findAll();
	}

	public Optional<Film> getFilmById(Long id) {
		return filmRepo.findById(id);
	}

	public void addFilm(Film film) {
		filmRepo.save(film);
	}

	public void removeFilm(Long id) {
		Optional<Film> film = filmRepo.findById(id);
		filmRepo.delete(film.get());
	}

	public void updateFilm(Long id, Film film) {
		Optional<Film> Act = filmRepo.findById(id);
		if (Act.isPresent()) {
			film.setId(Act.get().getId());
			filmRepo.save(film);
		}
	}
	
    public ArrayList<Actor> getActors(Long filmId) {
    	return actorRepo.findActorsByFilmId(filmId);
    }
    
    public ArrayList<Genre> getGenres(Long filmId) {
    	return genreRepo.findGenresByFilmId(filmId);
    }
    
    public ArrayList<Review> getReviews(Long filmId) {
    	return reviewRepo.findReviewsByFilmId(filmId);
    }
    
    public ArrayList<UserScore> getUserScores(Long filmId) {
    	return userScoreRepo.findUserScoresByFilmId(filmId);
    }
    
    public ArrayList<CriticScore> getCriticScores(Long filmId) {
    	return criticScoreRepo.findCriticScoresByFilmId(filmId);
    }
    
    public Optional<Director> getDirector(Long filmId) {
    	Optional<Film> fil = filmRepo.findById(filmId);
    	Optional<Director> dir = directorRepo.findById(fil.get().getDirector().getId());
    	return dir;
    	
    }
    
    
}