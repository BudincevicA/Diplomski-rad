package praktikum.diplomski.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.ChatMessage;


@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
	Iterable<ChatMessage> findByRecipientOrSender(String recipient, String sender);

}
