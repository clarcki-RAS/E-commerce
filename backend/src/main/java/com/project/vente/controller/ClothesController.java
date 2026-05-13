package com.project.vente.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.vente.model.Clothes;
import com.project.vente.model.User;
import com.project.vente.repository.ClothesRepository;
import com.project.vente.repository.UserRepository;
import com.project.vente.request.ClothesRequest;
import com.project.vente.service.ClothesService;
import com.project.vente.service.UserService;


@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("api/clothes")
public class ClothesController {

	@Autowired
	ClothesService clothesService;
	
	@Autowired
	ClothesRepository clothesRepository;
	
	@Autowired
	UserRepository userRepositoy;
	
	@Autowired
	UserService userService;
	
    private static final String UPLOAD_DIR = "C:/Users/Raz/Documents/react_ts/react_project/public/assets/uploaded/";

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
        try {
            // Vérifiez si le fichier n'est pas vide
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Le fichier est vide.");
            }

            // Enregistrez le fichier dans le répertoire de votre projet Spring Boot
            String filePath = UPLOAD_DIR + file.getOriginalFilename();
            file.transferTo(new File(filePath));

            // Retournez une réponse de succès
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while uploading your image");
        }
    }
    
    @PostMapping("/add")
    public ResponseEntity<Clothes> addClothes(@RequestBody ClothesRequest clothesRequest){
    	User user = userService.findById(clothesRequest.userId);
    	
    	 Clothes clothes = new Clothes();
         clothes.setTitle(clothesRequest.title);
         clothes.setPrice(clothesRequest.price);
         clothes.setDescription(clothesRequest.description);
         clothes.setQuantity(clothesRequest.quantity);
         clothes.setImageUrl(clothesRequest.imageUrl);
         clothes.setUser(user);
         
         Clothes savedClothes = clothesService.saveClothes(clothes);
         
         return ResponseEntity.ok(savedClothes);
    }
    
    @GetMapping("/list")
    public ResponseEntity<List<Clothes>> fetchClothes(){
    	List<Clothes> clothes = clothesService.fetchClothes();
    	return ResponseEntity.ok(clothes);
    }
    
    @GetMapping("/home/{userId}")
    public ResponseEntity<List<Clothes>> fetchClothesHome(@PathVariable Long userId){
    	List<Clothes> clothesNotOwned = clothesService.getClothesWithoutUser(userId);
    	return ResponseEntity.ok(clothesNotOwned);
    }
    
    @GetMapping("/list/{userId}")
	public ResponseEntity<List<Clothes>> fetchUserClothes(@PathVariable Long userId){
    	List<Clothes> clothes = clothesService.findByUser(userId);
    	return ResponseEntity.ok(clothes);
    }
    
    @PutMapping("/update/{clotheId}")
    public ResponseEntity<Clothes> updateClothes(@PathVariable Long clotheId, @RequestBody Clothes clothesRequest){
    	Clothes existingClothes = clothesRepository.findById(clotheId).orElse(null);
    	if(existingClothes != null) {
    		Clothes clothes = new Clothes();
    		
    		clothes.setId(existingClothes.getId());
    		clothes.setTitle(clothesRequest.getTitle());
    		clothes.setDescription(clothesRequest.getDescription());
    		clothes.setPrice(clothesRequest.getPrice());
    		clothes.setQuantity(clothesRequest.getQuantity());
    		clothes.setImageUrl(existingClothes.getImageUrl());
    		clothes.setUser(existingClothes.getUser());
    		
    		Clothes updatedClothes = clothesService.updateClothes(clothes);
    		return ResponseEntity.ok(updatedClothes);
    	}
    	return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/delete/{clotheId}")
    public String deleteClothes(@PathVariable Long clotheId) {
    	Clothes existingClothes = clothesRepository.findById(clotheId).orElse(null);
    	if(existingClothes != null) {
    		Clothes clothes = new Clothes();
    		
    		clothes.setId(existingClothes.getId());
    		clothes.setTitle(existingClothes.getTitle());
    		clothes.setDescription(existingClothes.getDescription());
    		clothes.setPrice(existingClothes.getPrice());
    		clothes.setQuantity(0);
    		clothes.setImageUrl(existingClothes.getImageUrl());
    		clothes.setUser(existingClothes.getUser());

    		clothesService.updateClothes(clothes);
        	return "Your clothe was deleted";
    	}
    	return "Error";
    }
}
