package com.project.vente.service;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vente.model.Cart;
import com.project.vente.model.User;
import com.project.vente.repository.CartRepository;
import com.project.vente.repository.UserRepository;
import com.project.vente.request.CartChart;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public Cart saveCart(Cart cart) {
		
		return cartRepository.save(cart);
	}

	@Override
	public Map<Date, List<Cart>> getCartsByDayandDate(Long buyerId, Date date) {
		
		List<Cart> carts = cartRepository.findAllByDayAndDate(buyerId, date);
		return carts.stream().collect(Collectors.groupingBy( cart -> {Calendar calendar = Calendar.getInstance();
																	  calendar.setTime(cart.getDateCommande());
																	  calendar.set(Calendar.HOUR_OF_DAY, 0);
																	  calendar.set(Calendar.MINUTE, 0);
																	  calendar.set(Calendar.SECOND, 0);
																	  calendar.set(Calendar.MILLISECOND, 0);
																	  return calendar.getTime(); } 
		));
	}

	@Override
	public Map<Date, Map<Double, List<Cart>>> getCartsByDay(Long buyerId) {
		
		List<Cart> carts = cartRepository.findAllByDay(buyerId);
		Map<Date, Map<Double, List<Cart>>> resultMap = new LinkedHashMap<>();
		
		for (Cart cart : carts) {
            // Truncate the date to day level
            Date day = truncateTime(cart.getDateCommande());

            // Check if the map already contains the day, if not, create a new entry
            resultMap.putIfAbsent(day, new LinkedHashMap<>());

            // Calculate the total for the current cart item
            Double total = cart.getPrice() * cart.getQuantity();

            // Get the map corresponding to the day and add the total and cart to it
            resultMap.get(day).put(total, Arrays.asList(cart));
        }
		return resultMap;
	}
	
//	@Override
//	public Map<Date, Map<Double, List<Cart>>> getCartsByDayandDate(Long buyerId, Date date) {
//		
//		List<Cart> carts = cartRepository.findAllByDayAndDate(buyerId, date);
//		Map<Date, Map<Double, List<Cart>>> resultMap = new LinkedHashMap<>();
//		
//		for (Cart cart : carts) {
//
//            Date day = truncateTime(cart.getDateCommande());
//
//            resultMap.putIfAbsent(day, new LinkedHashMap<>());
//
//            Double total = cart.getPrice() * cart.getQuantity();
//
//            resultMap.get(day).put(total, Arrays.asList(cart));
//        }
//		return resultMap;
//	}


	private Date truncateTime(Date date) {
		
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		
		return calendar.getTime();
	}

	@Override
	public CartChart getChartData(Long buyerId) {
		
		User buyer = userRepository.findById(buyerId).orElse(null);
		return cartRepository.getChartData(buyer);
		
	}
}
