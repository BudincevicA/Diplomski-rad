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
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = Integer.MAX_VALUE, nullable = false)
	private String reviewText;

	@ManyToOne
	private AccountData accountData;

	@ManyToOne
	private Film film;

	@NotNull
	private Boolean deleted = false;

	public Review() {
	};

	public Review(Long id, String reviewText, AccountData accountData, Film film, @NotNull Boolean deleted) {
		super();
		this.id = id;
		this.reviewText = reviewText;
		this.accountData = accountData;
		this.film = film;
		this.deleted = deleted;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getReviewText() {
		return reviewText;
	}

	public void setReviewText(String reviewText) {
		this.reviewText = reviewText;
	}

	public AccountData getAccountData() {
		return accountData;
	}

	public void setAccountData(AccountData accountData) {
		this.accountData = accountData;
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
