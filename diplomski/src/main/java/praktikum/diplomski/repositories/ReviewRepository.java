package praktikum.diplomski.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.Review;

@Repository
public interface ReviewRepository  extends JpaRepository<Review, Long>{
	ArrayList<Review> findByAccountDataIdEquals(Long id);
	ArrayList<Review> findReviewsByFilmId(Long filmId);
}
