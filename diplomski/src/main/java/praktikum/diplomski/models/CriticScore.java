package praktikum.diplomski.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Where;

@Entity
@Where(clause = "deleted = 'false'")
public class CriticScore {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String usernameOfScore;

	@Column
	private String value;

    @ManyToOne
	private Film film;

	@NotNull
	private Boolean deleted = false;

	public CriticScore() {};
	
	public CriticScore(Long id, String usernameOfScore, String value, Film film, @NotNull Boolean deleted) {
		super();
		this.id = id;
		this.usernameOfScore = usernameOfScore;
		this.value = value;
		this.film = film;
		this.deleted = deleted;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsernameOfScore() {
		return usernameOfScore;
	}

	public void setUsernameOfScore(String usernameOfScore) {
		this.usernameOfScore = usernameOfScore;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Film getFilm() {
		return film;
	}

	public void setFilm(Film film) {
		this.film = film;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

}
