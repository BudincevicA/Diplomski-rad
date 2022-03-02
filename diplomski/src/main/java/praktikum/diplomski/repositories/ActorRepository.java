package praktikum.diplomski.repositories;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.Actor;

@Repository
public interface ActorRepository  extends JpaRepository<Actor, Long>{
	@Query("SELECT a FROM Actor a WHERE a.firstName LIKE ?1")
	Iterable<Optional<Actor>> findActorsByFirstName(String firstName);
	@Query("SELECT a FROM Actor a WHERE a.lastName LIKE ?1")
	Iterable<Optional<Actor>> findActorsByLastName(String lastName);
	
/*	@Query("SELECT a "
			+ "FROM Actor a "
			+ "JOIN actor_film af ON a.id = af.actor_id "
			+ "JOIN Film f ON af.film_id = f.id "
			+ "WHERE f.id = ?1")
	ArrayList<Actor> findActorsByFilmId(Long filmId);
	*/
	
	@Query("SELECT a FROM Actor a JOIN a.films f WHERE f.id = ?1")
	ArrayList<Actor> findActorsByFilmId(Long filmId);

}
