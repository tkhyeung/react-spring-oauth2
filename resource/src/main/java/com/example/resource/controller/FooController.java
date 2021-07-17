package com.example.resource.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/foos")
public class FooController {

    {
        mapping.add("zero");
        mapping.add("one");
        mapping.add("3333");
        mapping.add("four");
        mapping.add("cinq");
        mapping.add("six");
        mapping.add("7");
        mapping.add("huit");
        mapping.add("XI");
        mapping.add("X");
        mapping.add("eleven");
        mapping.add("juuni");
    }

    private static List<String> mapping = new ArrayList<>();

    private final int min = 0;
    private final int max = mapping.size() - 1;

    @GetMapping
    public List<String> getFoos(){
        int randomSize = getRandomNumber(1, max);
        List<String> foos = new ArrayList<>();
        IntStream.range(0,randomSize).forEach(i -> foos.add(mapping.get(getRandomNumber(min, max))));
        return foos.stream().distinct().collect(Collectors.toList());
    }

    @GetMapping("/random")
    public String getRandomFoo(){
        return mapping.get(getRandomNumber(min, max));
    }

    private int getRandomNumber(int min, int max) {
        Random random = new Random();
        return random.nextInt(max - min) + min;
    }

}
