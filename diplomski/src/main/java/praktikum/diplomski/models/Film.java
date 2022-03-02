package praktikum.diplomski.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;

import praktikum.diplomski.utils.View.ShowCriticScore;
import praktikum.diplomski.utils.View.ShowReview;
import praktikum.diplomski.utils.View.ShowUserScore;

//@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
@JsonIgnoreProperties({ "users","usersD" })
@Entity
@Where(clause = "deleted = 'false'")
public class Film {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 128, nullable = false)
	private String title;

	@JsonView(ShowReview.class)
	@OneToMany(mappedBy = "film", cascade = CascadeType.ALL)
	private Set<Review> reviews;

	@ManyToOne
	private Director director;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinTable(name = "Actor_Film", joinColumns = { @JoinColumn(name = "film_id") }, inverseJoinColumns = {
			@JoinColumn(name = "actor_id") })
	private Set<Actor> actors;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinTable(name = "Genre_Film", joinColumns = { @JoinColumn(name = "film_id") }, inverseJoinColumns = {
			@JoinColumn(name = "genre_id") })
	private Set<Genre> genres;

	@ManyToMany(mappedBy = "films", cascade = CascadeType.MERGE)
	private Set<User> users;

	@ManyToMany(mappedBy = "dislikes", cascade = CascadeType.MERGE)
	private Set<User> usersD;

	@Column(length = 255)
	private String profilePicturePath;

	@JsonView(ShowUserScore.class)
	@OneToMany(mappedBy = "film", cascade = CascadeType.ALL)
	private Set<UserScore> userScores;

	@JsonView(ShowCriticScore.class)
	@OneToMany(mappedBy = "film", cascade = CascadeType.ALL)
	private Set<CriticScore> criticScores;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinTable(name = "film_forum", joinColumns = {
			@JoinColumn(name = "film_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "forum_id", referencedColumnName = "id") })
	private Forum forum;

	@NotNull
	private Boolean deleted = false;

	public Film() {
	};

	public Film(Long id, String title, Set<Review> reviews, Director director, Set<Actor> actors, Set<Genre> genres,
			Set<User> users, Set<User> usersD, String profilePicturePath, Set<UserScore> userScores,
			Set<CriticScore> criticScores, Forum forum, @NotNull Boolean deleted) {
		super();
		this.id = id;
		this.title = title;
		this.reviews = reviews;
		this.director = director;
		this.actors = actors;
		this.genres = genres;
		this.users = users;
		this.usersD = usersD;
		this.profilePicturePath = profilePicturePath;
		this.userScores = userScores;
		this.criticScores = criticScores;
		this.forum = forum;
		this.deleted = deleted;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Set<User> getUsersD() {
		return usersD;
	}

	public void setUsersD(Set<User> usersD) {
		this.usersD = usersD;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Set<Review> getReviews() {
		return reviews;
	}

	public void setReviews(Set<Review> reviews) {
		this.reviews = reviews;
	}

	public Director getDirector() {
		return director;
	}

	public void setDirector(Director director) {
		this.director = director;
	}

	public Set<Actor> getActors() {
		return actors;
	}

	public void setActors(Set<Actor> actors) {
		this.actors = actors;
	}

	public Set<Genre> getGenres() {
		return genres;
	}

	public void setGenres(Set<Genre> genres) {
		this.genres = genres;
	}

	public String getProfilePicturePath() {
		return profilePicturePath;
	}

	public void setProfilePicturePath(String profilePicturePath) {
		this.profilePicturePath = profilePicturePath;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public Set<UserScore> getUserScores() {
		return userScores;
	}

	public void setUserScores(Set<UserScore> userScores) {
		this.userScores = userScores;
	}

	public Set<CriticScore> getCriticScores() {
		return criticScores;
	}

	public void setCriticScores(Set<CriticScore> criticScores) {
		this.criticScores = criticScores;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Forum getForum() {
		return forum;
	}

	public void setForum(Forum forum) {
		this.forum = forum;
	};

}
