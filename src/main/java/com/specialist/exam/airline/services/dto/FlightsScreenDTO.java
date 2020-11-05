package com.specialist.exam.airline.services.dto;

import com.specialist.exam.airline.model.Flight;

import java.util.List;

public class FlightsScreenDTO {
    private List<Flight> flights;
    private List<String> citiesFrom;
    private List<String> citiesTo;

    public List<Flight> getFlights() {
        return flights;
    }

    public void setFlights(List<Flight> flights) {
        this.flights = flights;
    }

    public List<String> getCitiesFrom() {
        return citiesFrom;
    }

    public void setCitiesFrom(List<String> citiesFrom) {
        this.citiesFrom = citiesFrom;
    }

    public List<String> getCitiesTo() {
        return citiesTo;
    }

    public void setCitiesTo(List<String> citiesTo) {
        this.citiesTo = citiesTo;
    }
}
