package praktikum.diplomski.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.ChatMessage;
import praktikum.diplomski.repositories.ChatMessageRepository;


@Service
public class ChatMessageService {

	@Autowired
	private ChatMessageRepository chatMessageRepo;

	public ChatMessageService() {
    }

	public Iterable<ChatMessage> getChatMessages() {
		return chatMessageRepo.findAll();
	}

	public Iterable<ChatMessage> getChatMessagesByUser(String username) {
		return chatMessageRepo.findByRecipientOrSender(username, username);
	}

	public Optional<ChatMessage> getChatMessageById(Long id) {
		return chatMessageRepo.findById(id);
	}

	public void addChatMessage(ChatMessage chatMessage) {
		String recipientUsername = chatMessage.getRecipient();
		String senderUsername = chatMessage.getSender();
		if (recipientUsername != null && senderUsername != null) {
			chatMessage.setRecipient(recipientUsername);
			chatMessage.setSender(senderUsername);
			chatMessageRepo.save(chatMessage);
		}
	}

	public void removeChatMessage(Long id) {
		Optional<ChatMessage> chatMessage = chatMessageRepo.findById(id);
		chatMessageRepo.delete(chatMessage.get());
	}

	public void updateChatMessage(Long id, ChatMessage chatMessage) {
		Optional<ChatMessage> Mes = chatMessageRepo.findById(id);
		if (Mes.isPresent()) {
			chatMessage.setId(Mes.get().getId());
			chatMessageRepo.save(chatMessage);
		}
	}
}
