package praktikum.diplomski.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.Critic;

@Repository
public interface CriticRepository  extends JpaRepository<Critic, Long> {
	@Query("SELECT c FROM Critic c WHERE c.firstName LIKE ?1")
	Iterable<Optional<Critic>> findCriticsByFirstName(String firstName);
	@Query("SELECT c FROM Critic c WHERE c.lastName LIKE ?1")
	Iterable<Optional<Critic>> findCriticsByLastName(String lastName);
	@Query("SELECT c FROM Critic c WHERE c.accountData.username = ?1")
	Optional<Critic> getByUsername(String username);
}