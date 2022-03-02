package praktikum.diplomski.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.Director;
import praktikum.diplomski.models.Film;
import praktikum.diplomski.repositories.DirectorRepository;
import praktikum.diplomski.repositories.FilmRepository;

@Service
public class DirectorService {
	@Autowired
	private DirectorRepository directorRepo;
	
	@Autowired
	private FilmRepository filmRepo;

	public DirectorService() {
	}

	public Iterable<Director> getDirectors() {
		return directorRepo.findAll();
	}

	public Optional<Director> getDirectorById(Long id) {
		return directorRepo.findById(id);
	}

	public void addDirector(Director director) {
		directorRepo.save(director);
	}

	public void removeDirector(Long id) {
		Optional<Director> director = directorRepo.findById(id);
		directorRepo.delete(director.get());
	}

	public void updateDirector(Long id, Director director) {
		Optional<Director> Act = directorRepo.findById(id);
		if (Act.isPresent()) {
			director.setId(Act.get().getId());
			directorRepo.save(director);
		}
	}

	public Iterable<Optional<Director>> getDirectorsByFirstName(String firstName) {
		return directorRepo.findDirectorsByFirstName("%" + firstName + "%");
	}

	public Iterable<Optional<Director>> getDirectorsByLastName(String lastName) {
		return directorRepo.findDirectorsByLastName("%" + lastName + "%");
	}
	
    public ArrayList<Film> getFilms(Long directorId) {
    	return filmRepo.findFilmsByDirectorId(directorId);
    }

}