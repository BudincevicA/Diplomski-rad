package praktikum.diplomski.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.ForumMessage;
import praktikum.diplomski.repositories.ForumMessageRepository;

@Service
public class ForumMessageService {
	
	@Autowired
	ForumMessageRepository forumMessageRepo;
	
	public ForumMessageService() {
	}

	public Iterable<ForumMessage> getForumMessages() {
		return forumMessageRepo.findAll();
	}

	public Optional<ForumMessage> getForumMessageById(Long id) {
		return forumMessageRepo.findById(id);
	}

	public void addForumMessage(ForumMessage forumMessage) {
		forumMessageRepo.save(forumMessage);
	}

	public void removeForumMessage(Long id) {
		Optional<ForumMessage> forumMessage = forumMessageRepo.findById(id);
		forumMessageRepo.delete(forumMessage.get());
	}

	public void updateForumMessage(Long id, ForumMessage forumMessage) {
		Optional<ForumMessage> Act = forumMessageRepo.findById(id);
		if (Act.isPresent()) {
			forumMessage.setId(Act.get().getId());
			forumMessageRepo.save(forumMessage);
		}
	}
	
}