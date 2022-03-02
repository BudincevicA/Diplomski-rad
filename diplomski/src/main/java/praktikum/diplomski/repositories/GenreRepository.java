package praktikum.diplomski.repositories;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.Genre;

@Repository
public interface GenreRepository extends JpaRepository <Genre, Long> {

	Optional<Genre> getByName(String string);
	
	@Query("SELECT g FROM Genre g JOIN g.films f WHERE f.id = ?1")
	ArrayList<Genre> findGenresByFilmId(Long filmId);
	
}