package praktikum.diplomski.repositories;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.Film;

@Repository
public interface FilmRepository extends JpaRepository <Film, Long> {

	Optional<Film> getByTitle(String string);
	ArrayList<Film> findFilmsByUsersId(Long userId);
	
	@Query("SELECT f FROM Film f JOIN f.usersD u WHERE u.id = ?1")
	ArrayList<Film> findDislikesByUsersId(Long userId);
	
	@Query("SELECT f FROM Film f JOIN f.actors a WHERE a.id = ?1")
	ArrayList<Film> findFilmsByActorId(Long ActorId);
	
	@Query("SELECT f FROM Film f JOIN f.director d WHERE d.id = ?1")
	ArrayList<Film> findFilmsByDirectorId(Long DirectorId);
	
}