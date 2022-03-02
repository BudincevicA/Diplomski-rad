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
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Where;

@Entity
@Where(clause = "deleted = 'false'")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(cascade = CascadeType.ALL)
	private AccountData accountData;

	@Column(length = 128, nullable = false)
	private String firstName;

	@Column(length = 128, nullable = false)
	private String lastName;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "Film_User", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = {
			@JoinColumn(name = "film_id") })
	private Set<Film> films;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "Film_User_Dislike", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = {
			@JoinColumn(name = "film_id") })
	private Set<Film> dislikes;

	@NotNull
	private Boolean deleted = false;

	public User() {
	}

	public User(Long id, AccountData accountData, String firstName, String lastName, Set<Film> films, Set<Film> dislikes,
			@NotNull Boolean deleted) {
		super();
		this.id = id;
		this.accountData = accountData;
		this.firstName = firstName;
		this.lastName = lastName;
		this.films = films;
		this.dislikes = dislikes;
		this.deleted = deleted;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Set<Film> getDislikes() {
		return dislikes;
	}

	public void setDislikes(Set<Film> dislikes) {
		this.dislikes = dislikes;
	}

	public AccountData getAccountData() {
		return accountData;
	}

	public void setAccountData(AccountData accountData) {
		this.accountData = accountData;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Set<Film> getFilms() {
		return films;
	}

	public void setFilms(Set<Film> films) {
		this.films = films;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}
}