package praktikum.diplomski.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonView;

import praktikum.diplomski.utils.View.showForumMessage;

@Entity
@Where(clause = "deleted = 'false'")
public class ForumTopic {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private Forum forum;

	@Column(length = 128, nullable = false)
	private String title;

	@Column(length = 128, nullable = false)
	private String description;

	@JsonView(showForumMessage.class)
	@OneToMany(mappedBy = "forumTopic", cascade = CascadeType.ALL)
	private Set<ForumMessage> forumMessages;

	@NotNull
	private Boolean deleted = false;

	public ForumTopic() {
	}

	public ForumTopic(Long id, Forum forum, String title, String description, Set<ForumMessage> forumMessages,
			@NotNull Boolean deleted) {
		super();
		this.id = id;
		this.forum = forum;
		this.title = title;
		this.description = description;
		this.forumMessages = forumMessages;
		this.deleted = deleted;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Forum getForum() {
		return forum;
	}

	public void setForum(Forum forum) {
		this.forum = forum;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Set<ForumMessage> getForumMessages() {
		return forumMessages;
	}

	public void setForumMessages(Set<ForumMessage> forumMessages) {
		this.forumMessages = forumMessages;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	};

}
