package praktikum.diplomski.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.User;

@Repository
public interface UserRepository  extends JpaRepository<User, Long> {
	@Query("SELECT u FROM User u WHERE u.firstName LIKE ?1")
	Iterable<Optional<User>> findUsersByFirstName(String firstName);
	@Query("SELECT u FROM User u WHERE u.lastName LIKE ?1")
	Iterable<Optional<User>> findUsersByLastName(String lastName);
	@Query("SELECT u FROM User u WHERE u.accountData.username = ?1")
	Optional<User> getByUsername(String username);
}