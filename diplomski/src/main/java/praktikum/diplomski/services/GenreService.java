package praktikum.diplomski.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.Genre;
import praktikum.diplomski.repositories.GenreRepository;

@Service
public class GenreService {
	@Autowired
	private GenreRepository genreRepo;

	public GenreService() {
	}

	public Iterable<Genre> getGenres() {
		return genreRepo.findAll();
	}

	public Optional<Genre> getGenreById(Long id) {
		return genreRepo.findById(id);
	}

	public void addGenre(Genre genre) {
		genreRepo.save(genre);
	}

	public void removeGenre(Long id) {
		Optional<Genre> genre = genreRepo.findById(id);
		genreRepo.delete(genre.get());
	}

	public void updateGenre(Long id, Genre genre) {
		Optional<Genre> Act = genreRepo.findById(id);
		if (Act.isPresent()) {
			genre.setId(Act.get().getId());
			genreRepo.save(genre);
		}
	}
}
