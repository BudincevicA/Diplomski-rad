package praktikum.diplomski.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonView;

import praktikum.diplomski.utils.View.ShowAccountDataPermission;
import praktikum.diplomski.utils.View.ShowReview;
import praktikum.diplomski.utils.View.showForumMessage;

@Entity
public class AccountData {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 128, nullable = false, unique = true)
	private String username;

	@Column(length = 128, nullable = false)
	private String password;

	@Column(length = 128, nullable = false)
	private String email;

	@JsonView(ShowAccountDataPermission.class)
	@OneToMany(mappedBy = "accountData", cascade = CascadeType.ALL)
	private Set<AccountDataPermission> accountDataPermissions;

	@JsonView(ShowReview.class)
	@OneToMany(mappedBy = "accountData", cascade = CascadeType.ALL)
	private Set<Review> reviews;

	@Column(length = 255)
	private String profilePicturePath;

	@JsonView(showForumMessage.class)
	@OneToMany(mappedBy = "accountData",cascade = CascadeType.ALL)
	private Set<ForumMessage> forumMessages;

	public AccountData() {
	}

	public AccountData(Long id, String username, String password, String email,
			Set<AccountDataPermission> accountDataPermissions, Set<Review> reviews, String profilePicturePath,
			Set<ForumMessage> forumMessages) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.accountDataPermissions = accountDataPermissions;
		this.reviews = reviews;
		this.profilePicturePath = profilePicturePath;
		this.forumMessages = forumMessages;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<AccountDataPermission> getAccountDataPermissions() {
		return accountDataPermissions;
	}

	public void setAccountDataPermissions(Set<AccountDataPermission> accountDataPermissions) {
		this.accountDataPermissions = accountDataPermissions;
	}

	public Set<Review> getReviews() {
		return reviews;
	}

	public void setReviews(Set<Review> reviews) {
		this.reviews = reviews;
	}

	public String getProfilePicturePath() {
		return profilePicturePath;
	}

	public void setProfilePicturePath(String profilePicturePath) {
		this.profilePicturePath = profilePicturePath;
	}

	public Set<ForumMessage> getForumMessages() {
		return forumMessages;
	}

	public void setForumMessages(Set<ForumMessage> forumMessages) {
		this.forumMessages = forumMessages;
	}

}
