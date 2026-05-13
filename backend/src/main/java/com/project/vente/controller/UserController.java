package com.project.vente.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.vente.model.User;
import com.project.vente.service.UserService;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("api/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping("/add")
	public ResponseEntity<User> add(@RequestBody User user) {
		User saveUser = userService.saveUser(user);
		return ResponseEntity.ok(saveUser);
	}
	
	@PostMapping("/login")
	public ResponseEntity<User> getUserLog(@RequestBody User userRequest){
		User user = userService.authenticate(userRequest);
		if(user != null) {
			return ResponseEntity.ok(user);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
}
