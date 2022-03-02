package praktikum.diplomski.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.Review;
import praktikum.diplomski.repositories.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepo;


    public ReviewService() {
    }

    public Iterable<Review> getReviews() {
        return reviewRepo.findAll();
    }

    public Optional<Review> getReviewById(Long id) {
        return reviewRepo.findById(id);
    }

    public void addReview(Review review) {
    	reviewRepo.save(review);
    }

    public void removeReview(Long id) {
        Optional<Review> review = reviewRepo.findById(id);
        reviewRepo.delete(review.get());
    }

    public void updateReview(Long id, Review review) {
        Optional<Review> Rev = reviewRepo.findById(id);
        if(Rev.isPresent()) {
        	review.setId(Rev.get().getId());
        	reviewRepo.save(review);
        }
    }
	
	
}
