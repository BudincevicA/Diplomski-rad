package praktikum.diplomski.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.Director;

@Repository
public interface DirectorRepository  extends JpaRepository<Director, Long>{
	@Query("SELECT d FROM Director d WHERE d.firstName LIKE ?1")
	Iterable<Optional<Director>> findDirectorsByFirstName(String firstName);
	@Query("SELECT d FROM Director d WHERE d.lastName LIKE ?1")
	Iterable<Optional<Director>> findDirectorsByLastName(String lastName);

}