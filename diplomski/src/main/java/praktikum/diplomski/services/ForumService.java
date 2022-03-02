package praktikum.diplomski.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.Forum;
import praktikum.diplomski.models.ForumTopic;
import praktikum.diplomski.repositories.ForumRepository;
import praktikum.diplomski.repositories.ForumTopicRepository;

@Service
public class ForumService {
	
	@Autowired
	ForumRepository forumRepo;
	
	@Autowired
	ForumTopicRepository forumTopicRepo;
	
	public ForumService() {
	}

	public Iterable<Forum> getForums() {
		return forumRepo.findAll();
	}

	public Optional<Forum> getForumById(Long id) {
		return forumRepo.findById(id);
	}

	public void addForum(Forum forum) {
		forumRepo.save(forum);
	}

	public void removeForum(Long id) {
		Optional<Forum> forum = forumRepo.findById(id);
		forumRepo.delete(forum.get());
	}

	public void updateForum(Long id, Forum forum) {
		Optional<Forum> Act = forumRepo.findById(id);
		if (Act.isPresent()) {
			forum.setId(Act.get().getId());
			forumRepo.save(forum);
		}
	}

    public ArrayList<ForumTopic> getForumTopics(Long forumId) {
    	return forumTopicRepo.findForumTopicsByForumId(forumId);
    }
	
	
}
