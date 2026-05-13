package com.project.vente.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vente.model.User;
import com.project.vente.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public User saveUser(User user) {
		
		return userRepository.save(user);
	}

	@Override
	public User authenticate(User user) {
		String email = user.getEmail();
		
		return userRepository.findByEmail(email);
		
	}

	@Override
	public User findById(Long userId) {
		
		return userRepository.findById(userId).orElse(null);
	}
	
}
