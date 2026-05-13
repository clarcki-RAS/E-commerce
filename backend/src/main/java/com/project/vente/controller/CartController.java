package com.project.vente.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.vente.model.Cart;
import com.project.vente.model.Clothes;
import com.project.vente.model.User;
import com.project.vente.repository.CartRepository;
import com.project.vente.repository.ClothesRepository;
import com.project.vente.request.CartChart;
import com.project.vente.request.CartRequest;
import com.project.vente.service.CartService;
import com.project.vente.service.ClothesService;
import com.project.vente.service.UserService;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("api/cart")
public class CartController {
	
	@Autowired
	CartRepository cartRepository;
	
	@Autowired
	ClothesService clothesService;
	
	@Autowired
	private CartService cartService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ClothesRepository clothesRepository;
	
	@PostMapping("/add")
	@Transactional
	public ResponseEntity<Cart> saveCart(@RequestBody CartRequest cartRequest){
		
		User user = userService.findById(cartRequest.buyerId);
		Clothes clothe = clothesRepository.findById(cartRequest.clotheId).orElse(null);
		
		Cart cart = new Cart();
		cart.setClothesId(clothe);
		cart.setBuyerId(user);
		cart.setQuantity(cartRequest.quantity);
		cart.setPrice(clothe.getPrice());
		cart.setDateCommande(new Date());
		
		Cart savedCart = cartService.saveCart(cart);

		return ResponseEntity.ok(savedCart);
	}
	
	@PutMapping("/updateClothe/{clotheId}")
	public Clothes updatingClothe(@PathVariable Long clotheId, @RequestBody CartRequest cartRequest) {
		
		Clothes clothe = clothesRepository.findById(clotheId).orElse(null);
		
		Integer quantityTaken = clothe.getQuantity() - cartRequest.quantity; 
		
		Clothes updateClothe = new Clothes();
		updateClothe.setId(clothe.getId());
		updateClothe.setTitle(clothe.getTitle());
		updateClothe.setPrice(clothe.getPrice());
		updateClothe.setDescription(clothe.getDescription());
		updateClothe.setQuantity(quantityTaken);
        updateClothe.setImageUrl(clothe.getImageUrl());
        updateClothe.setUser(clothe.getUser());
        
        return clothesService.saveClothes(updateClothe);
	}
	
	@PutMapping("/updateClotheCart/{clotheId}")
	public Clothes updatingClotheCart(@PathVariable Long clotheId, @RequestBody CartRequest cartRequest) {
		
		Clothes clothe = clothesRepository.findById(clotheId).orElse(null);
		
		Integer quantityTaken = clothe.getQuantity() + cartRequest.quantity; 
		
		Clothes updateClothe = new Clothes();
		updateClothe.setId(clothe.getId());
		updateClothe.setTitle(clothe.getTitle());
		updateClothe.setPrice(clothe.getPrice());
		updateClothe.setDescription(clothe.getDescription());
		updateClothe.setQuantity(quantityTaken);
        updateClothe.setImageUrl(clothe.getImageUrl());
        updateClothe.setUser(clothe.getUser());
        
        return clothesService.saveClothes(updateClothe);
	}
	
	@DeleteMapping("cancel/{cartId}")
	public String cancelCart(@PathVariable Long cartId) {
		
			cartRepository.deleteById(cartId);
			return "Your cart got cancelled";

	}

    @GetMapping("/list/{buyerId}")
    public ResponseEntity<Map<Date, Map<Double, List<Cart>>>> fetchCart(@PathVariable Long buyerId){
    	
    	Map<Date, Map<Double, List<Cart>>> carts = cartService.getCartsByDay(buyerId) ;
    	return ResponseEntity.ok(carts);
    }
    
//    @GetMapping("/listDate/{buyerId}")
//    public ResponseEntity<Map<Date, Map<Double, List<Cart>>>> fetchCart(@PathVariable Long buyerId, @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date date) {
//        Map<Date, Map<Double, List<Cart>>> carts = cartService.getCartsByDayandDate(buyerId, date);
//        return ResponseEntity.ok(carts);
//    }
    
    @GetMapping("/listDate/{buyerId}")
    public ResponseEntity<Map<Date, List<Cart>>> fetchCart(@PathVariable Long buyerId, @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date date) {
        Map<Date, List<Cart>> carts = cartService.getCartsByDayandDate(buyerId, date);
        return ResponseEntity.ok(carts);
    }
    
    @GetMapping("/chartData/{buyerId}")
    public ResponseEntity<CartChart> getChartData(@PathVariable Long buyerId){
    	
    	CartChart chartData = cartService.getChartData(buyerId);
    	return ResponseEntity.ok(chartData);
    }
}
