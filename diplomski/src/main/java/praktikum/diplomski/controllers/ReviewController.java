package praktikum.diplomski.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import praktikum.diplomski.models.Review;
import praktikum.diplomski.services.ReviewService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins={"http://localhost:4200"})
@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @JsonView(HideOptionalProperties.class)
    @RequestMapping()
    public ResponseEntity<Iterable<Review>> getReviews() {
        return new ResponseEntity<Iterable<Review>>(reviewService.getReviews(), HttpStatus.OK);
    }

    @JsonView(HideOptionalProperties.class)
    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        Optional<Review> review = reviewService.getReviewById(id);
        if(review.isPresent()) {
            return new ResponseEntity<Review>(review.get(), HttpStatus.OK);
        }
        return new ResponseEntity<Review>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<Review> addReview(@RequestBody Review Review) { 
    	reviewService.addReview(Review);
        return new ResponseEntity<Review>(Review, HttpStatus.CREATED);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review Review) {
        reviewService.updateReview(id, Review);
        return new ResponseEntity<Review>(Review, HttpStatus.CREATED);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<Review> removeReview(@PathVariable Long id) {
        try {
            reviewService.removeReview(id);
        }catch (Exception e) {
            return new ResponseEntity<Review>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Review>(HttpStatus.NO_CONTENT);
    }
	
	
}
