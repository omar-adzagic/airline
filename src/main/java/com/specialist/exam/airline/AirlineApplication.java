package com.specialist.exam.airline;

import com.specialist.exam.airline.domain.*;
import com.specialist.exam.airline.repository.*;
import com.specialist.exam.airline.service.FlightsService;
import com.specialist.exam.airline.service.PromotionsService;
import com.specialist.exam.airline.service.ReservationsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class AirlineApplication implements CommandLineRunner {
    public static void main(String[] args) {
        SpringApplication.run(AirlineApplication.class, args);
    }

    @Autowired
    private RolesRepository rolesRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AirplanesRepository airplanesRepository;
    @Autowired
    private FlightsRepository flightsRepository;
    @Autowired
    private ReservationsRepository reservationsRepository;
    @Autowired
    private FlightsService flightsService;
    @Autowired
    private ReservationsService reservationsService;
    @Autowired
    private PromotionsRepository promotionsRepository;
    @Autowired
    private PromotionsService promotionsService;

    @Override
    public void run(String... args) throws Exception {
//        this.reservationsService.deleteAll();
//        this.reservationsRepository.flush();
        if (rolesRepository.count() != 0) {
            return;
        }

        Role admin = new Role("ADMIN");
        this.rolesRepository.save(admin);
        Role user = new Role("USER");
        this.rolesRepository.save(user);

        User test = new User("test ime", "test prezime", "test@email.com", "test", "12345678", true, admin);
        this.userRepository.save(test);
        User zvonko = new User("Zvonko", "Bogdan", "zvonko@email.com", "zvonja", "12345678", true, admin);
        this.userRepository.save(zvonko);
        User marko = new User("Marko", "Marković", "marko@email.com", "masja", "12345678", false, user);
        this.userRepository.save(marko);
        User ivan = new User("Ivan", "Ivanović", "ivan@email.com", "ivo", "12345678", true, user);
        this.userRepository.save(ivan);

        Airplane boeing737 = new Airplane("Boeing 737", 150, 2003, true);
        this.airplanesRepository.save(boeing737);
        Airplane boeing747 = new Airplane("Boeing 747", 120, 1996, false);
        this.airplanesRepository.save(boeing747);
        Airplane airbusa320 = new Airplane("Airbus A320", 200, 2008, true);
        this.airplanesRepository.save(airbusa320);
        Airplane airbusa330 = new Airplane("Airbus A330", 210, 2011, true);
        this.airplanesRepository.save(airbusa330);

//        Flight flight1 = new Flight(LocalDate.now().plusDays(5), LocalDate.now().plusDays(10), "Beograd", "Istanbul", Instant.now().plus(Duration.ofDays(30)), Instant.now().plus(Duration.ofDays(26)), 120, true, boeing737);
//        this.flightsRepository.save(flight1);
//        Flight flight2 = new Flight(LocalDate.now().plusDays(10), LocalDate.now().plusDays(20), "Tivat", "Moskva", Instant.now().plus(Duration.ofDays(20)), Instant.now().plus(Duration.ofDays(17)), 185, true, boeing747);
//        this.flightsRepository.save(flight2);
//        Flight flight3 = new Flight(LocalDate.now().plusDays(20), LocalDate.now().plusDays(30), "Beograd", "Frankfurt", Instant.now().plus(Duration.ofDays(10)), Instant.now().plus(Duration.ofDays(6)), 65, true, airbusa320);
//        this.flightsRepository.save(flight3);
//        Flight flight4 = new Flight(LocalDate.now().plusDays(18), LocalDate.now().plusDays(28), "Beograd", "Berlin", Instant.now().plus(Duration.ofDays(12)), Instant.now().plus(Duration.ofDays(8)), 85, true, boeing737);
//        this.flightsRepository.save(flight4);
//        Flight flight5 = new Flight(LocalDate.now().plusDays(22), LocalDate.now().plusDays(34), "Tivat", "Istanbul", Instant.now().plus(Duration.ofDays(35)), Instant.now().plus(Duration.ofDays(24)), 135, true, airbusa320);
//        this.flightsRepository.save(flight5);
//
//        Promotion promotion1 = new Promotion(flight1);
//        this.promotionsRepository.save(promotion1);
//        Promotion promotion2 = new Promotion(flight3);
//        this.promotionsRepository.save(promotion2);
//        Promotion promotion3 = new Promotion(flight4);
//        this.promotionsRepository.save(promotion3);
//        Promotion promotion4 = new Promotion(flight3);
//        this.promotionsRepository.save(promotion4);
//        Promotion promotion5 = new Promotion(flight1);
//        this.promotionsRepository.save(promotion5);
//        Promotion promotion6 = new Promotion(flight3);
//        this.promotionsRepository.save(promotion6);
//        Promotion promotion7 = new Promotion(flight4);
//        this.promotionsRepository.save(promotion7);
//        Promotion promotion8 = new Promotion(flight3);
//        this.promotionsRepository.save(promotion8);
//        Promotion promotion9 = new Promotion(flight1);
//        this.promotionsRepository.save(promotion9);
//        Promotion promotion10 = new Promotion(flight4);
//        this.promotionsRepository.save(promotion10);
//        Promotion promotion11 = new Promotion(flight3);
//        this.promotionsRepository.save(promotion11);
//
//        Reservation reservation1 = new Reservation("S", Instant.now().plus(Duration.ofDays(2)), zvonko, flight1, false);
//        this.reservationsRepository.save(reservation1);
//        Reservation reservation2 = new Reservation("A", Instant.now().plus(Duration.ofDays(4)), marko, flight2, true);
//        this.reservationsRepository.save(reservation2);
//        Reservation reservation3 = new Reservation("S", Instant.now().plus(Duration.ofDays(5)), ivan, flight3, false);
//        this.reservationsRepository.save(reservation3);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedMethods("GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS", "HEAD");
            }
        };
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
