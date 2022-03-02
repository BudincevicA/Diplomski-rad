package praktikum.diplomski.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.ForumMessage;

@Repository
public interface ForumMessageRepository extends JpaRepository <ForumMessage, Long> {
	ArrayList<ForumMessage> findForumMessagesByForumTopicId(Long forumTopicId);
	ArrayList<ForumMessage> findForumMessagesByAccountDataId(Long accountDataId);


}

