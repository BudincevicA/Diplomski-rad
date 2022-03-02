package praktikum.diplomski.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;

import praktikum.diplomski.utils.View.showForumTopic;

@JsonIgnoreProperties({ "film" })
@Entity
@Where(clause = "deleted = 'false'")
public class Forum {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(mappedBy = "forum")
	private Film film;

	@JsonView(showForumTopic.class)
	@OneToMany(mappedBy = "forum", cascade = CascadeType.ALL)
	private Set<ForumTopic> forumTopics;

	@NotNull
	private Boolean deleted = false;

	public Forum() {
	}

	public Forum(Long id, Film film, Set<ForumTopic> forumTopics, @NotNull Boolean deleted) {
		super();
		this.id = id;
		this.film = film;
		this.forumTopics = forumTopics;
		this.deleted = deleted;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Film getFilm() {
		return film;
	}

	public void setFilm(Film film) {
		this.film = film;
	}

	public Set<ForumTopic> getForumTopics() {
		return forumTopics;
	}

	public void setForumTopics(Set<ForumTopic> forumTopics) {
		this.forumTopics = forumTopics;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	};

}
