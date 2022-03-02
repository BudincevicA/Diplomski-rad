package praktikum.diplomski.services;


import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.ForumMessage;
import praktikum.diplomski.models.ForumTopic;
import praktikum.diplomski.repositories.ForumMessageRepository;
import praktikum.diplomski.repositories.ForumTopicRepository;

@Service
public class ForumTopicService {
	
	@Autowired
	ForumTopicRepository forumTopicRepo;
	
	@Autowired
	ForumMessageRepository forumMessageRepo;
	
	public ForumTopicService() {
	}

	public Iterable<ForumTopic> getForumTopics() {
		return forumTopicRepo.findAll();
	}

	public Optional<ForumTopic> getForumTopicById(Long id) {
		return forumTopicRepo.findById(id);
	}

	public void addForumTopic(ForumTopic forumTopic) {
		forumTopicRepo.save(forumTopic);
	}

	public void removeForumTopic(Long id) {
		Optional<ForumTopic> forumTopic = forumTopicRepo.findById(id);
		forumTopicRepo.delete(forumTopic.get());
	}

	public void updateForumTopic(Long id, ForumTopic forumTopic) {
		Optional<ForumTopic> Act = forumTopicRepo.findById(id);
		if (Act.isPresent()) {
			forumTopic.setId(Act.get().getId());
			forumTopicRepo.save(forumTopic);
		}
	}
	
    public ArrayList<ForumMessage> getForumMessages(Long forumTopicId) {
    	return forumMessageRepo.findForumMessagesByForumTopicId(forumTopicId);
    }
	
}