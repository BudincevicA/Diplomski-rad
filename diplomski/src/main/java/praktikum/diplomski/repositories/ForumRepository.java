package praktikum.diplomski.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.Forum;

@Repository
public interface ForumRepository extends JpaRepository <Forum, Long> {

}
