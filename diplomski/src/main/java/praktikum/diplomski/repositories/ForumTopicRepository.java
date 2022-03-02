package praktikum.diplomski.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.ForumTopic;

@Repository
public interface ForumTopicRepository extends JpaRepository <ForumTopic, Long> {
	ArrayList<ForumTopic> findForumTopicsByForumId(Long forumId);

}
