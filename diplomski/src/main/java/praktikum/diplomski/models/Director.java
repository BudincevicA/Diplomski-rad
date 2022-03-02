package praktikum.diplomski.models;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;

import praktikum.diplomski.utils.View.ShowFilm;

@JsonIgnoreProperties({ "films" })
@Entity
@Where(clause = "deleted = 'false'")
public class Director {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 128, nullable = false)
	private String firstName;

	@Column(length = 128, nullable = false)
	private String lastName;

	@JsonView(ShowFilm.class)
	@OneToMany(mappedBy = "director")
	private Set<Film> films;

	@Column
	private Date dateOfBirth;

	@Column(length = 128, nullable = false)
	private String profilePicturePath;

	@Column(length = 1234, nullable = false)
	private String biography;

	@Column(nullable = false)
	private String placeOfBirth;

	@NotNull
	private Boolean deleted = false;

	public Director() {
	}

	public Director(Long id, String firstName, String lastName, Set<Film> films, Date dateOfBirth,
			String profilePicturePath, String biography, String placeOfBirth, @NotNull Boolean deleted) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.films = films;
		this.dateOfBirth = dateOfBirth;
		this.profilePicturePath = profilePicturePath;
		this.biography = biography;
		this.placeOfBirth = placeOfBirth;
		this.deleted = deleted;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getProfilePicturePath() {
		return profilePicturePath;
	}

	public void setProfilePicturePath(String profilePicturePath) {
		this.profilePicturePath = profilePicturePath;
	}

	public String getBiography() {
		return biography;
	}

	public void setBiography(String biography) {
		this.biography = biography;
	}

	public String getPlaceOfBirth() {
		return placeOfBirth;
	}

	public void setPlaceOfBirth(String placeOfBirth) {
		this.placeOfBirth = placeOfBirth;
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
	};

}