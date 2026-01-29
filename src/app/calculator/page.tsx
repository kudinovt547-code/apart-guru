"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select } from "@/components/ui/select";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { Calculator, Save, AlertCircle } from "lucide-react";

// ============================================
// БАЗА ДАННЫХ БЕНЧМАРКОВ (86 объектов)
// Актуальность: Январь 2026
// loc_class: 'Prime' (Топ), 'Center' (Деловой/Курортный центр), 'Hub' (Транспортный/Спальный)
// ============================================
const APARTMENTS_DB = [
  // --- 1. САНКТ-ПЕТЕРБУРГ (ID 100+) ---
  { id: 101, city_code: 1, city: "Санкт-Петербург", name: "VALO Hotel City", class: "Business", price_m2: 290000, adr_low: 3800, adr_high: 7500, occ_avg: 0.84, uk_fee: 0.25, model: "Hybrid", loc_class: "Center" },
  { id: 102, city_code: 1, city: "Санкт-Петербург", name: "YE'S Marata", class: "Comfort", price_m2: 310000, adr_low: 3500, adr_high: 6500, occ_avg: 0.88, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 103, city_code: 1, city: "Санкт-Петербург", name: "Docklands", class: "Business", price_m2: 360000, adr_low: 4800, adr_high: 9500, occ_avg: 0.78, uk_fee: 0.25, model: "Hybrid", loc_class: "Center" },
  { id: 104, city_code: 1, city: "Санкт-Петербург", name: "Avenue Apart на Малом", class: "Business", price_m2: 340000, adr_low: 4500, adr_high: 8500, occ_avg: 0.80, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 105, city_code: 1, city: "Санкт-Петербург", name: "Avenue-Apart Pulkovo", class: "Comfort", price_m2: 240000, adr_low: 3200, adr_high: 5500, occ_avg: 0.85, uk_fee: 0.20, model: "Short", loc_class: "Hub" },
  { id: 106, city_code: 1, city: "Санкт-Петербург", name: "IN2IT (Интуит)", class: "Comfort", price_m2: 220000, adr_low: 2800, adr_high: 4800, occ_avg: 0.85, uk_fee: 0.15, model: "Hybrid", loc_class: "Hub" },
  { id: 107, city_code: 1, city: "Санкт-Петербург", name: "Про.Молодость", class: "Comfort", price_m2: 195000, adr_low: 2500, adr_high: 4200, occ_avg: 0.82, uk_fee: 0.20, model: "Long", loc_class: "Hub" },
  { id: 108, city_code: 1, city: "Санкт-Петербург", name: "Salut! (Салют)", class: "Comfort", price_m2: 210000, adr_low: 2700, adr_high: 4500, occ_avg: 0.80, uk_fee: 0.20, model: "Hybrid", loc_class: "Hub" },
  { id: 109, city_code: 1, city: "Санкт-Петербург", name: "Putilov Avenir", class: "Comfort", price_m2: 230000, adr_low: 3000, adr_high: 5000, occ_avg: 0.83, uk_fee: 0.20, model: "Short", loc_class: "Hub" },
  { id: 110, city_code: 1, city: "Санкт-Петербург", name: "Kirovsky Avenir", class: "Comfort", price_m2: 240000, adr_low: 3100, adr_high: 5200, occ_avg: 0.83, uk_fee: 0.20, model: "Short", loc_class: "Hub" },
  { id: 111, city_code: 1, city: "Санкт-Петербург", name: "Moskovsky Avenir", class: "Comfort", price_m2: 260000, adr_low: 3300, adr_high: 5800, occ_avg: 0.84, uk_fee: 0.20, model: "Short", loc_class: "Hub" },
  { id: 112, city_code: 1, city: "Санкт-Петербург", name: "Vertical (Московский)", class: "Business", price_m2: 290000, adr_low: 3700, adr_high: 7200, occ_avg: 0.86, uk_fee: 0.25, model: "Hybrid", loc_class: "Center" },
  { id: 113, city_code: 1, city: "Санкт-Петербург", name: "We&I by Vertical", class: "Comfort", price_m2: 250000, adr_low: 3000, adr_high: 5500, occ_avg: 0.89, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 114, city_code: 1, city: "Санкт-Петербург", name: "Well", class: "Business", price_m2: 400000, adr_low: 5500, adr_high: 10500, occ_avg: 0.75, uk_fee: 0.25, model: "Hybrid", loc_class: "Center" },
  { id: 115, city_code: 1, city: "Санкт-Петербург", name: "Artstudio Moskovsky", class: "Business", price_m2: 350000, adr_low: 4800, adr_high: 8500, occ_avg: 0.85, uk_fee: 0.20, model: "Short", loc_class: "Center" },
  { id: 116, city_code: 1, city: "Санкт-Петербург", name: "Artstudio Nevsky", class: "Business", price_m2: 480000, adr_low: 6500, adr_high: 15000, occ_avg: 0.82, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 117, city_code: 1, city: "Санкт-Петербург", name: "Yard Residence", class: "Business", price_m2: 550000, adr_low: 8000, adr_high: 18000, occ_avg: 0.70, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 118, city_code: 1, city: "Санкт-Петербург", name: "Grani (Грани)", class: "Comfort", price_m2: 320000, adr_low: 4000, adr_high: 7000, occ_avg: 0.80, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 119, city_code: 1, city: "Санкт-Петербург", name: "One Trinity Place", class: "Business", price_m2: 1100000, adr_low: 35000, adr_high: 70000, occ_avg: 0.60, uk_fee: 0.30, model: "Long", loc_class: "Prime" },
  { id: 120, city_code: 1, city: "Санкт-Петербург", name: "M97", class: "Comfort", price_m2: 260000, adr_low: 3200, adr_high: 5500, occ_avg: 0.83, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 121, city_code: 1, city: "Санкт-Петербург", name: "Next", class: "Business", price_m2: 310000, adr_low: 4000, adr_high: 7500, occ_avg: 0.80, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 122, city_code: 1, city: "Санкт-Петербург", name: "Lotos Tower", class: "Business", price_m2: 380000, adr_low: 5000, adr_high: 9000, occ_avg: 0.75, uk_fee: 0.25, model: "Short", loc_class: "Hub" },
  // Сеть Port Comfort (СПб) - почти все Prime
  { id: 123, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort on Ligovskiy", class: "Business", price_m2: 300000, adr_low: 3800, adr_high: 7500, occ_avg: 0.88, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 124, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Sennaya", class: "Business", price_m2: 290000, adr_low: 3600, adr_high: 7200, occ_avg: 0.87, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 125, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Moyka", class: "Comfort", price_m2: 270000, adr_low: 3200, adr_high: 6500, occ_avg: 0.90, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 126, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Gostiny Dvor", class: "Comfort", price_m2: 310000, adr_low: 4000, adr_high: 8000, occ_avg: 0.92, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 127, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort on Petrogradka", class: "Comfort", price_m2: 260000, adr_low: 3000, adr_high: 6000, occ_avg: 0.85, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 128, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Old Nevsky", class: "Comfort", price_m2: 250000, adr_low: 2900, adr_high: 5800, occ_avg: 0.86, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 129, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by The Griboedov", class: "Comfort", price_m2: 265000, adr_low: 3100, adr_high: 6200, occ_avg: 0.88, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 130, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Smolnyy", class: "Comfort", price_m2: 255000, adr_low: 3000, adr_high: 5900, occ_avg: 0.84, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 131, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Mariinsky", class: "Comfort", price_m2: 260000, adr_low: 3000, adr_high: 5800, occ_avg: 0.85, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 132, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Marata", class: "Comfort", price_m2: 240000, adr_low: 2800, adr_high: 5500, occ_avg: 0.89, uk_fee: 0.25, model: "Short", loc_class: "Center" },

  // --- 2. МОСКВА (ID 200+) ---
  { id: 201, city_code: 2, city: "Москва", name: "YE'S Technopark", class: "Comfort", price_m2: 400000, adr_low: 4500, adr_high: 6000, occ_avg: 0.88, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 202, city_code: 2, city: "Москва", name: "YE'S Botanika", class: "Comfort", price_m2: 380000, adr_low: 4200, adr_high: 5500, occ_avg: 0.86, uk_fee: 0.20, model: "Long", loc_class: "Hub" },
  { id: 203, city_code: 2, city: "Москва", name: "YE'S Mitino", class: "Comfort", price_m2: 320000, adr_low: 3500, adr_high: 4800, occ_avg: 0.90, uk_fee: 0.20, model: "Long", loc_class: "Hub" },
  { id: 204, city_code: 2, city: "Москва", name: "Port Comfort on Pokrovka", class: "Comfort", price_m2: 550000, adr_low: 5500, adr_high: 8500, occ_avg: 0.92, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 205, city_code: 2, city: "Москва", name: "Adagio Paveletskaya", class: "Business", price_m2: 480000, adr_low: 7500, adr_high: 11000, occ_avg: 0.78, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 206, city_code: 2, city: "Москва", name: "Clementine", class: "Comfort", price_m2: 350000, adr_low: 4000, adr_high: 6000, occ_avg: 0.82, uk_fee: 0.20, model: "Long", loc_class: "Hub" },
  { id: 207, city_code: 2, city: "Москва", name: "The Book", class: "Business", price_m2: 950000, adr_low: 15000, adr_high: 25000, occ_avg: 0.72, uk_fee: 0.30, model: "Short", loc_class: "Prime" },
  { id: 208, city_code: 2, city: "Москва", name: "Neva Towers", class: "Business", price_m2: 1100000, adr_low: 20000, adr_high: 35000, occ_avg: 0.65, uk_fee: 0.25, model: "Long", loc_class: "Prime" },
  { id: 209, city_code: 2, city: "Москва", name: "ОКО (OKO)", class: "Business", price_m2: 900000, adr_low: 18000, adr_high: 30000, occ_avg: 0.65, uk_fee: 0.25, model: "Long", loc_class: "Prime" },
  { id: 210, city_code: 2, city: "Москва", name: "Башня Федерация", class: "Business", price_m2: 950000, adr_low: 19000, adr_high: 32000, occ_avg: 0.68, uk_fee: 0.25, model: "Long", loc_class: "Prime" },
  { id: 211, city_code: 2, city: "Москва", name: "IQ-квартал", class: "Business", price_m2: 850000, adr_low: 16000, adr_high: 28000, occ_avg: 0.70, uk_fee: 0.25, model: "Long", loc_class: "Prime" },
  { id: 212, city_code: 2, city: "Москва", name: "Match Point", class: "Business", price_m2: 430000, adr_low: 6500, adr_high: 9500, occ_avg: 0.80, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 213, city_code: 2, city: "Москва", name: "VTB Arena Park", class: "Business", price_m2: 650000, adr_low: 12000, adr_high: 18000, occ_avg: 0.75, uk_fee: 0.25, model: "Hybrid", loc_class: "Center" },
  { id: 214, city_code: 2, city: "Москва", name: "Hill8", class: "Business", price_m2: 600000, adr_low: 10000, adr_high: 15000, occ_avg: 0.74, uk_fee: 0.25, model: "Hybrid", loc_class: "Center" },
  { id: 215, city_code: 2, city: "Москва", name: "Roza Rossa", class: "Business", price_m2: 1800000, adr_low: 45000, adr_high: 80000, occ_avg: 0.55, uk_fee: 0.35, model: "Short", loc_class: "Prime" },
  { id: 216, city_code: 2, city: "Москва", name: "LUNAR", class: "Business", price_m2: 800000, adr_low: 14000, adr_high: 22000, occ_avg: 0.70, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 217, city_code: 2, city: "Москва", name: "High Life", class: "Business", price_m2: 750000, adr_low: 13000, adr_high: 20000, occ_avg: 0.72, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 218, city_code: 2, city: "Москва", name: "Cult", class: "Business", price_m2: 1200000, adr_low: 25000, adr_high: 45000, occ_avg: 0.60, uk_fee: 0.30, model: "Short", loc_class: "Prime" },
  { id: 219, city_code: 2, city: "Москва", name: "Kleinhouse", class: "Business", price_m2: 490000, adr_low: 6500, adr_high: 10000, occ_avg: 0.82, uk_fee: 0.20, model: "Long", loc_class: "Center" },
  { id: 220, city_code: 2, city: "Москва", name: "Loft 17", class: "Business", price_m2: 460000, adr_low: 6000, adr_high: 9500, occ_avg: 0.83, uk_fee: 0.20, model: "Long", loc_class: "Center" },
  { id: 221, city_code: 2, city: "Москва", name: "Aerolofts", class: "Comfort", price_m2: 380000, adr_low: 4500, adr_high: 6500, occ_avg: 0.85, uk_fee: 0.15, model: "Long", loc_class: "Hub" },
  { id: 222, city_code: 2, city: "Москва", name: "Apartville", class: "Comfort", price_m2: 300000, adr_low: 3800, adr_high: 5500, occ_avg: 0.88, uk_fee: 0.15, model: "Long", loc_class: "Hub" },
  { id: 223, city_code: 2, city: "Москва", name: "Лайнер (Liner)", class: "Business", price_m2: 410000, adr_low: 5500, adr_high: 8000, occ_avg: 0.87, uk_fee: 0.15, model: "Long", loc_class: "Hub" },

  // --- 3. СОЧИ (ID 300+) ---
  { id: 301, city_code: 3, city: "Сочи", name: "Adagio Le Rond", class: "Business", price_m2: 750000, adr_low: 8000, adr_high: 25000, occ_avg: 0.68, uk_fee: 0.30, model: "Short", loc_class: "Center" },
  { id: 302, city_code: 3, city: "Сочи", name: "Имеретинский", class: "Business", price_m2: 680000, adr_low: 7500, adr_high: 19000, occ_avg: 0.72, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 303, city_code: 3, city: "Сочи", name: "Moravia (Моравия)", class: "Business", price_m2: 550000, adr_low: 6000, adr_high: 15000, occ_avg: 0.70, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 304, city_code: 3, city: "Сочи", name: "Grand Royal Residences", class: "Business", price_m2: 1900000, adr_low: 25000, adr_high: 70000, occ_avg: 0.55, uk_fee: 0.35, model: "Short", loc_class: "Prime" },
  { id: 305, city_code: 3, city: "Сочи", name: "Mantera Seaview", class: "Business", price_m2: 3800000, adr_low: 50000, adr_high: 150000, occ_avg: 0.50, uk_fee: 0.40, model: "Short", loc_class: "Prime" },
  { id: 306, city_code: 3, city: "Сочи", name: "Reef Residence", class: "Business", price_m2: 2500000, adr_low: 35000, adr_high: 90000, occ_avg: 0.45, uk_fee: 0.35, model: "Short", loc_class: "Prime" },
  { id: 307, city_code: 3, city: "Сочи", name: "Актер Гэлакси", class: "Business", price_m2: 900000, adr_low: 13000, adr_high: 32000, occ_avg: 0.65, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 308, city_code: 3, city: "Сочи", name: "Сан-Сити", class: "Business", price_m2: 800000, adr_low: 11000, adr_high: 28000, occ_avg: 0.65, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 309, city_code: 3, city: "Сочи", name: "Karat (Hyatt)", class: "Business", price_m2: 2200000, adr_low: 32000, adr_high: 85000, occ_avg: 0.58, uk_fee: 0.35, model: "Short", loc_class: "Prime" },
  { id: 310, city_code: 3, city: "Сочи", name: "Metropol Residences", class: "Business", price_m2: 1500000, adr_low: 25000, adr_high: 60000, occ_avg: 0.60, uk_fee: 0.35, model: "Short", loc_class: "Prime" },
  { id: 311, city_code: 3, city: "Сочи", name: "Нескучный сад", class: "Business", price_m2: 650000, adr_low: 9000, adr_high: 21000, occ_avg: 0.68, uk_fee: 0.30, model: "Short", loc_class: "Center" },
  { id: 312, city_code: 3, city: "Сочи", name: "Лучезарный", class: "Business", price_m2: 600000, adr_low: 7000, adr_high: 18000, occ_avg: 0.70, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 313, city_code: 3, city: "Сочи", name: "Mirror (Зеркальный)", class: "Business", price_m2: 500000, adr_low: 5500, adr_high: 12000, occ_avg: 0.75, uk_fee: 0.20, model: "Short", loc_class: "Center" },
  { id: 314, city_code: 3, city: "Сочи", name: "Горизонт", class: "Business", price_m2: 480000, adr_low: 5000, adr_high: 11000, occ_avg: 0.73, uk_fee: 0.20, model: "Short", loc_class: "Hub" },
  { id: 315, city_code: 3, city: "Сочи", name: "Monet (Моне)", class: "Business", price_m2: 950000, adr_low: 11000, adr_high: 29000, occ_avg: 0.69, uk_fee: 0.30, model: "Short", loc_class: "Prime" },
  { id: 316, city_code: 3, city: "Сочи", name: "Крымский", class: "Comfort", price_m2: 350000, adr_low: 3500, adr_high: 7500, occ_avg: 0.80, uk_fee: 0.15, model: "Long", loc_class: "Hub" },
  { id: 317, city_code: 3, city: "Сочи", name: "Олимп", class: "Comfort", price_m2: 320000, adr_low: 3200, adr_high: 7000, occ_avg: 0.78, uk_fee: 0.15, model: "Long", loc_class: "Hub" },

  // --- 4. КАЛИНИНГРАД (ID 400+) ---
  { id: 401, city_code: 4, city: "Калининград", name: "Atlantis (Зеленоградск)", class: "Business", price_m2: 360000, adr_low: 6500, adr_high: 15000, occ_avg: 0.76, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 402, city_code: 4, city: "Калининград", name: "Royal Atlantis", class: "Business", price_m2: 450000, adr_low: 9000, adr_high: 22000, occ_avg: 0.70, uk_fee: 0.30, model: "Short", loc_class: "Prime" },
  { id: 403, city_code: 4, city: "Калининград", name: "Park House", class: "Business", price_m2: 320000, adr_low: 5500, adr_high: 12000, occ_avg: 0.75, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 404, city_code: 4, city: "Калининград", name: "Midgard Club", class: "Business", price_m2: 380000, adr_low: 7000, adr_high: 16000, occ_avg: 0.72, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 405, city_code: 4, city: "Калининград", name: "Кранц-Парк", class: "Comfort", price_m2: 250000, adr_low: 4000, adr_high: 9000, occ_avg: 0.80, uk_fee: 0.20, model: "Short", loc_class: "Hub" },
  { id: 406, city_code: 4, city: "Калининград", name: "Baden-Baden (Светлогорск)", class: "Comfort", price_m2: 300000, adr_low: 5500, adr_high: 13000, occ_avg: 0.88, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 407, city_code: 4, city: "Калининград", name: "Alt-Platz", class: "Business", price_m2: 310000, adr_low: 5000, adr_high: 11000, occ_avg: 0.78, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 408, city_code: 4, city: "Калининград", name: "Раушен-Престиж", class: "Business", price_m2: 330000, adr_low: 5200, adr_high: 11500, occ_avg: 0.77, uk_fee: 0.25, model: "Short", loc_class: "Prime" },

  // --- 5. КАЗАНЬ (ID 500+) ---
  { id: 501, city_code: 5, city: "Казань", name: "Кремлевская 44", class: "Business", price_m2: 340000, adr_low: 5500, adr_high: 9500, occ_avg: 0.76, uk_fee: 0.20, model: "Short", loc_class: "Prime" },
  { id: 502, city_code: 5, city: "Казань", name: "Odette", class: "Business", price_m2: 500000, adr_low: 10000, adr_high: 20000, occ_avg: 0.65, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 503, city_code: 5, city: "Казань", name: "Savin House", class: "Business", price_m2: 290000, adr_low: 4800, adr_high: 7800, occ_avg: 0.82, uk_fee: 0.15, model: "Hybrid", loc_class: "Center" },
  { id: 504, city_code: 5, city: "Казань", name: "Art City", class: "Comfort", price_m2: 230000, adr_low: 3200, adr_high: 6500, occ_avg: 0.88, uk_fee: 0.15, model: "Short", loc_class: "Hub" },
  { id: 505, city_code: 5, city: "Казань", name: "Европейский", class: "Business", price_m2: 270000, adr_low: 4500, adr_high: 7500, occ_avg: 0.78, uk_fee: 0.20, model: "Short", loc_class: "Center" },
  { id: 506, city_code: 5, city: "Казань", name: "Clover House", class: "Business", price_m2: 280000, adr_low: 4600, adr_high: 8000, occ_avg: 0.80, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" }
];

// Уникальные города, классы и локации
const CITIES = Array.from(new Set(APARTMENTS_DB.map(a => a.city)));
const CLASSES = ["Comfort", "Business"];
const LOCATIONS = ["Prime", "Center", "Hub"];

// ============================================
// РЕАЛИСТИЧНАЯ МОДЕЛЬ РАСХОДОВ
// Обновлено: 2026-01-30
// Источник: анализ Telegram канала apartpro (2020-2024)
// ============================================

// Коэффициенты по городам для ЖКХ (₽/м²/мес)
// ⚠️ ВАЖНО: В апартаментах ЖКХ в 2-3 раза выше, чем в жилых квартирах!
//
// Реальные примеры из практики:
// - МФК WINGS на Крыленко: тарифы в 2 раза выше квартир
// - Содержание апартаментов: в 3 раза дороже (apartpro, 2020)
// - Студия 23 м²: ~7 000 ₽/мес коммуналка (Like)
const UTILITIES_BY_CITY: Record<string, number> = {
  "Москва": 280,              // +40% (реальные данные 2024)
  "Санкт-Петербург": 250,     // +39% (реальные данные 2024)
  "Сочи": 200,                // +25% (сезонный фактор)
  "Калининград": 180,         // +20% (реальные данные)
  "Казань": 170,              // +21% (реальные данные)
};

// Интернет + ТВ (₽/мес)
const INTERNET_TV_MONTHLY = 1500;

// Клининг + расходники (% от валового дохода)
// Покрывает: уборки между гостями, постельное, расходники, бытовую химию
const CLEANING_RATE = 0.10; // 10% от валового

// Текущий ремонт + замена мебели/техники (% от валового дохода)
// Покрывает: косметический ремонт, замена мебели, техники, сантехники
const MAINTENANCE_RATE = 0.025; // 2.5% от валового

// Страховка имущества (% от бюджета в год)
const INSURANCE_RATE = 0.003; // 0.3% от бюджета

// Налог УСН "Доходы" (% от валового дохода)
const TAX_RATE = 0.06; // 6%

// ============================================
// РЕАЛЬНЫЕ ПОКАЗАТЕЛИ РЫНКА (apartpro, 2024)
// ============================================
// 📊 Средняя доходность: 14% годовых (анализ 50+ проектов)
// 📊 Средняя загрузка: 77% (occupancy rate)
// 📊 Средняя окупаемость: 7.5 лет
// 📊 Комиссия УК: 15-25% (например, "Начало" - 18%)
//
// Реальный пример:
// Best Western Zoom Hotel (июль 2024):
// - Доходность: 3 005 ₽/м²/мес
// - План выполнен на 132%
// - Выплаты: 55 000 - 96 000 ₽/мес на апартамент
// ============================================

interface CalculatorInputs {
  city: string;
  propertyClass: string;
  location: string;
  area: number;
  budget: number;
}

interface NOIResult {
  grossRevenue: number; // Валовый доход (год)
  ukFee: number; // Комиссия УК (год)
  utilities: number; // ЖКХ (год)
  internetTv: number; // Интернет + ТВ (год)
  cleaning: number; // Клининг + расходники (год)
  maintenance: number; // Текущий ремонт (год)
  insurance: number; // Страховка (год)
  tax: number; // Налог УСН 6% (год)
  totalExpenses: number; // Итого расходов (год)
  netIncome: number; // Чистый доход (год)
  paybackYears: number; // Окупаемость (лет)
  roi: number; // Процент годовых (%)
  adr: number; // ADR использованный
  occupancy: number; // Загрузка использованная
}

interface CompSetInfo {
  apartments: typeof APARTMENTS_DB;
  avgAdrLow: number;
  avgAdrHigh: number;
  avgOccupancy: number;
  avgUkFee: number;
  usedNeighborClass: boolean;
  usedNeighborLocation: boolean;
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    city: "Санкт-Петербург",
    propertyClass: "Business",
    location: "Center",
    area: 35, // Обновлено: средняя площадь по рынку
    budget: 6000000, // Обновлено: реалистичная стоимость 2024
  });

  // ============================================
  // ФОРМИРОВАНИЕ COMPSET (конкурентная группа)
  // ============================================
  const compSet: CompSetInfo = useMemo(() => {
    // 1. Фильтруем по городу
    const cityApartments = APARTMENTS_DB.filter(a => a.city === inputs.city);

    // 2. Пытаемся найти по точному классу
    let filteredApartments = cityApartments.filter(a => a.class === inputs.propertyClass);
    let usedNeighborClass = false;

    // 3. Если не нашли по классу - берем все классы в городе
    if (filteredApartments.length === 0) {
      filteredApartments = cityApartments;
      usedNeighborClass = true;
    }

    // 4. Фильтруем по локации
    let locationFiltered = filteredApartments.filter(a => a.loc_class === inputs.location);
    let usedNeighborLocation = false;

    // 5. Если не нашли по локации - берем все локации
    if (locationFiltered.length === 0) {
      locationFiltered = filteredApartments;
      usedNeighborLocation = true;
    }

    // 6. Считаем средние значения
    const avgAdrLow = locationFiltered.reduce((sum, a) => sum + a.adr_low, 0) / locationFiltered.length || 0;
    const avgAdrHigh = locationFiltered.reduce((sum, a) => sum + a.adr_high, 0) / locationFiltered.length || 0;
    const avgOccupancy = locationFiltered.reduce((sum, a) => sum + a.occ_avg, 0) / locationFiltered.length || 0;
    const avgUkFee = locationFiltered.reduce((sum, a) => sum + a.uk_fee, 0) / locationFiltered.length || 0;

    return {
      apartments: locationFiltered,
      avgAdrLow,
      avgAdrHigh,
      avgOccupancy,
      avgUkFee,
      usedNeighborClass,
      usedNeighborLocation,
    };
  }, [inputs.city, inputs.propertyClass, inputs.location]);

  // ============================================
  // РАСЧЕТ СЦЕНАРИЕВ
  // ============================================
  const calculateScenario = (
    adr: number,
    occupancy: number
  ): NOIResult => {
    // ========================================
    // ДОХОДЫ
    // ========================================
    // Валовой доход = ADR × Загрузка × 365 дней
    const grossRevenue = adr * occupancy * 365;

    // ========================================
    // РАСХОДЫ
    // ========================================

    // 1. Комиссия УК (% от валового дохода, из базы данных)
    const ukFee = grossRevenue * compSet.avgUkFee;

    // 2. ЖКХ (коммунальные платежи: ₽/м²/мес × 12)
    const utilitiesRate = UTILITIES_BY_CITY[inputs.city] || 150;
    const utilities = utilitiesRate * inputs.area * 12;

    // 3. Интернет + ТВ (фиксированная сумма в месяц)
    const internetTv = INTERNET_TV_MONTHLY * 12;

    // 4. Клининг + расходники (% от валового дохода)
    // Покрывает: уборки между гостями, постельное, бытовая химия, расходники
    const cleaning = grossRevenue * CLEANING_RATE;

    // 5. Текущий ремонт + замена мебели/техники (% от валового дохода)
    // Покрывает: косметический ремонт, замена мебели, техники, сантехники
    const maintenance = grossRevenue * MAINTENANCE_RATE;

    // 6. Страховка имущества (% от бюджета в год)
    const insurance = inputs.budget * INSURANCE_RATE;

    // 7. Налог УСН "Доходы" (6% от валового дохода)
    const tax = grossRevenue * TAX_RATE;

    // Итого расходов
    const totalExpenses = ukFee + utilities + internetTv + cleaning + maintenance + insurance + tax;

    // ========================================
    // ЧИСТЫЙ ДОХОД
    // ========================================
    const netIncome = grossRevenue - totalExpenses;

    // ========================================
    // ПОКАЗАТЕЛИ ЭФФЕКТИВНОСТИ
    // ========================================
    // Окупаемость (лет) = Бюджет / Чистый доход
    const paybackYears = netIncome > 0 ? inputs.budget / netIncome : 999;

    // Процент годовых (%) = Чистый доход / Бюджет × 100
    const roi = (netIncome / inputs.budget) * 100;

    return {
      grossRevenue,
      ukFee,
      utilities,
      internetTv,
      cleaning,
      maintenance,
      insurance,
      tax,
      totalExpenses,
      netIncome,
      paybackYears,
      roi,
      adr,
      occupancy,
    };
  };

  // Три сценария:
  // Пессимист: adr_low, occupancy * 0.85
  const pessimisticResult = useMemo(() => {
    return calculateScenario(
      compSet.avgAdrLow,
      compSet.avgOccupancy * 0.85
    );
  }, [compSet, inputs.area, inputs.budget]);

  // Реалист: среднее между High и Low, occupancy средняя
  const realisticResult = useMemo(() => {
    const avgAdr = (compSet.avgAdrLow + compSet.avgAdrHigh) / 2;
    return calculateScenario(
      avgAdr,
      compSet.avgOccupancy
    );
  }, [compSet, inputs.area, inputs.budget]);

  // Оптимист: adr_high * 0.9, occupancy * 1.1
  const optimisticResult = useMemo(() => {
    return calculateScenario(
      compSet.avgAdrHigh * 0.9,
      Math.min(1, compSet.avgOccupancy * 1.1)
    );
  }, [compSet, inputs.area, inputs.budget]);

  const handleInputChange = (field: keyof CalculatorInputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const savedData = {
      inputs,
      result: realisticResult,
      compSet: compSet.apartments.map(a => a.name),
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("calculator-last-calc", JSON.stringify(savedData));
    alert("Расчёт сохранён в локальное хранилище");
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Калькулятор доходности</h1>
        <p className="text-muted-foreground">
          Расчёт на основе реальных рыночных данных (Benchmarking)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Параметры вашего объекта</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Base Params */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Город</Label>
                  <Select
                    id="city"
                    value={inputs.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  >
                    {CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="propertyClass">Класс объекта</Label>
                  <Select
                    id="propertyClass"
                    value={inputs.propertyClass}
                    onChange={(e) => handleInputChange("propertyClass", e.target.value)}
                  >
                    {CLASSES.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Локация</Label>
                  <Select
                    id="location"
                    value={inputs.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc === "Prime" ? "Топ-локация" : loc === "Center" ? "Центр" : "Район"}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area">Площадь, м²</Label>
                  <Input
                    id="area"
                    type="number"
                    value={inputs.area}
                    onChange={(e) =>
                      handleInputChange("area", Number(e.target.value))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Бюджет (стоимость), ₽</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={inputs.budget}
                    onChange={(e) =>
                      handleInputChange("budget", Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>

            {/* CompSet Info */}
            {compSet.apartments.length > 0 && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg border">
                <div className="flex items-start gap-2">
                  <Calculator className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <p className="font-semibold text-sm">
                      Мы сравниваем ваш объект с:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {compSet.apartments.map((apt) => (
                        <span
                          key={apt.id}
                          className="text-xs px-2 py-1 bg-background rounded border"
                        >
                          {apt.name}
                        </span>
                      ))}
                    </div>

                    {compSet.usedNeighborClass && (
                      <div className="flex items-start gap-2 mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                        <AlertCircle className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                        <p className="text-xs text-yellow-700 dark:text-yellow-500">
                          В выбранном городе нет объектов класса &quot;{inputs.propertyClass}&quot;.
                          Используем данные по всем классам в городе.
                        </p>
                      </div>
                    )}

                    {compSet.usedNeighborLocation && (
                      <div className="flex items-start gap-2 mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                        <AlertCircle className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                        <p className="text-xs text-yellow-700 dark:text-yellow-500">
                          Нет объектов в локации &quot;{inputs.location === "Prime" ? "Топ-локация" : inputs.location === "Center" ? "Центр" : "Район"}&quot;.
                          Используем данные по всем локациям.
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                      <div>
                        <span className="text-muted-foreground">Средняя загрузка:</span>
                        <span className="ml-1 font-mono tabular-nums font-semibold">
                          {formatPercent(compSet.avgOccupancy * 100)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Средняя комиссия УК:</span>
                        <span className="ml-1 font-mono tabular-nums font-semibold">
                          {formatPercent(compSet.avgUkFee * 100)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button onClick={handleSave} variant="outline" className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Сохранить расчёт
            </Button>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Реалистичный сценарий</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Чистый доход (год)</p>
                <p className="text-2xl font-bold font-mono tabular-nums text-primary">
                  {formatCurrency(realisticResult.netIncome)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Окупаемость</p>
                <p className="text-xl font-bold font-mono tabular-nums">
                  {formatNumber(realisticResult.paybackYears, 1)} лет
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Процент годовых</p>
                <p className="text-xl font-bold font-mono tabular-nums">
                  {formatPercent(realisticResult.roi)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">ADR / Загрузка</p>
                <p className="text-lg font-mono tabular-nums">
                  {formatCurrency(realisticResult.adr)} / {formatPercent(realisticResult.occupancy * 100)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Разбивка доходов и расходов</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {/* Доходы */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground font-semibold">Валовый доход</span>
                  <span className="font-mono tabular-nums font-bold text-primary">
                    {formatCurrency(realisticResult.grossRevenue)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  ADR {formatCurrency(realisticResult.adr)} × {formatPercent(realisticResult.occupancy * 100)} × 365 дней
                </div>
              </div>

              <div className="border-t my-3"></div>

              {/* Расходы */}
              <div className="space-y-2">
                <div className="text-muted-foreground font-semibold mb-2">Расходы:</div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Комиссия УК ({formatPercent(compSet.avgUkFee * 100)})</span>
                  <span className="font-mono tabular-nums text-red-600">
                    -{formatCurrency(realisticResult.ukFee)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">ЖКХ ({UTILITIES_BY_CITY[inputs.city] || 150}₽/м²/мес)</span>
                  <span className="font-mono tabular-nums text-red-600">
                    -{formatCurrency(realisticResult.utilities)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Интернет + ТВ</span>
                  <span className="font-mono tabular-nums text-red-600">
                    -{formatCurrency(realisticResult.internetTv)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Клининг + расходники ({formatPercent(CLEANING_RATE * 100)})</span>
                  <span className="font-mono tabular-nums text-red-600">
                    -{formatCurrency(realisticResult.cleaning)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Текущий ремонт ({formatPercent(MAINTENANCE_RATE * 100)})</span>
                  <span className="font-mono tabular-nums text-red-600">
                    -{formatCurrency(realisticResult.maintenance)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Страховка ({formatPercent(INSURANCE_RATE * 100)})</span>
                  <span className="font-mono tabular-nums text-red-600">
                    -{formatCurrency(realisticResult.insurance)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Налог УСН ({formatPercent(TAX_RATE * 100)})</span>
                  <span className="font-mono tabular-nums text-red-600">
                    -{formatCurrency(realisticResult.tax)}
                  </span>
                </div>

                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Итого расходов</span>
                  <span className="font-mono tabular-nums font-semibold text-red-600">
                    -{formatCurrency(realisticResult.totalExpenses)}
                  </span>
                </div>
              </div>

              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-base">Чистый доход (год)</span>
                <span className="font-mono tabular-nums font-bold text-primary text-base">
                  {formatCurrency(realisticResult.netIncome)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Сценарии развития</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Пессимистичный */}
            <div className="space-y-3 p-4 border rounded-lg bg-red-500/5 border-red-500/20">
              <h3 className="font-semibold text-red-600 dark:text-red-500">
                Пессимистичный
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">ADR</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatCurrency(pessimisticResult.adr)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Загрузка</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatPercent(pessimisticResult.occupancy * 100)}
                  </p>
                </div>
                <div className="border-t pt-2">
                  <p className="text-xs text-muted-foreground">Чистый доход/год</p>
                  <p className="font-mono tabular-nums font-bold text-base">
                    {formatCurrency(pessimisticResult.netIncome)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Окупаемость</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatNumber(pessimisticResult.paybackYears, 1)} лет
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Процент годовых</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatPercent(pessimisticResult.roi)}
                  </p>
                </div>
              </div>
            </div>

            {/* Реалистичный */}
            <div className="space-y-3 p-4 border rounded-lg bg-primary/5 border-primary/20">
              <h3 className="font-semibold text-primary">
                Реалистичный
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">ADR</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatCurrency(realisticResult.adr)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Загрузка</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatPercent(realisticResult.occupancy * 100)}
                  </p>
                </div>
                <div className="border-t pt-2">
                  <p className="text-xs text-muted-foreground">Чистый доход/год</p>
                  <p className="font-mono tabular-nums font-bold text-base">
                    {formatCurrency(realisticResult.netIncome)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Окупаемость</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatNumber(realisticResult.paybackYears, 1)} лет
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Процент годовых</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatPercent(realisticResult.roi)}
                  </p>
                </div>
              </div>
            </div>

            {/* Оптимистичный */}
            <div className="space-y-3 p-4 border rounded-lg bg-green-500/5 border-green-500/20">
              <h3 className="font-semibold text-green-600 dark:text-green-500">
                Оптимистичный
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">ADR</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatCurrency(optimisticResult.adr)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Загрузка</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatPercent(optimisticResult.occupancy * 100)}
                  </p>
                </div>
                <div className="border-t pt-2">
                  <p className="text-xs text-muted-foreground">Чистый доход/год</p>
                  <p className="font-mono tabular-nums font-bold text-base">
                    {formatCurrency(optimisticResult.netIncome)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Окупаемость</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatNumber(optimisticResult.paybackYears, 1)} лет
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Процент годовых</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatPercent(optimisticResult.roi)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg border text-sm space-y-2">
            <p className="font-semibold">Описание сценариев:</p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>
                <strong className="text-red-600 dark:text-red-500">Пессимистичный:</strong>{" "}
                ADR = низкий сезон, загрузка -15%
              </li>
              <li>
                <strong className="text-primary">Реалистичный:</strong>{" "}
                ADR = среднее между высоким и низким сезоном, средняя загрузка
              </li>
              <li>
                <strong className="text-green-600 dark:text-green-500">Оптимистичный:</strong>{" "}
                ADR = высокий сезон × 0.9 (с учётом скидок), загрузка +10%
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Реальные данные из практики */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Реальные показатели рынка
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Данные основаны на анализе реального рынка апартаментов (2020-2024)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 p-4 bg-background rounded-lg border">
              <p className="text-xs text-muted-foreground">Средняя доходность</p>
              <p className="text-2xl font-bold text-primary">14%</p>
              <p className="text-xs text-muted-foreground">
                Анализ 50+ проектов
              </p>
            </div>

            <div className="space-y-2 p-4 bg-background rounded-lg border">
              <p className="text-xs text-muted-foreground">Средняя загрузка</p>
              <p className="text-2xl font-bold text-primary">77%</p>
              <p className="text-xs text-muted-foreground">
                Occupancy rate
              </p>
            </div>

            <div className="space-y-2 p-4 bg-background rounded-lg border">
              <p className="text-xs text-muted-foreground">Средняя окупаемость</p>
              <p className="text-2xl font-bold text-primary">7.5 лет</p>
              <p className="text-xs text-muted-foreground">
                Реальная практика
              </p>
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg border space-y-3">
            <p className="font-semibold text-sm">Реальный пример: Best Western Zoom Hotel (июль 2024)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Доход с м²</p>
                <p className="font-mono font-bold text-primary">3 005 ₽/м²/мес</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Выполнение плана</p>
                <p className="font-mono font-bold text-green-600">132%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Выплаты владельцам</p>
                <p className="font-mono font-bold">55-96 тыс. ₽/мес</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold">⚠️ Важные факты:</p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
              <li>
                <strong>Коммунальные платежи</strong> в апартаментах в 2-3 раза выше, чем в жилых квартирах
              </li>
              <li>
                <strong>Комиссия УК</strong> обычно составляет 15-25% от дохода (например, УК &quot;Начало&quot; - 18%)
              </li>
              <li>
                <strong>Загрузка</strong> сильно зависит от сезона и качества управления
              </li>
              <li>
                <strong>Доходность</strong> может сильно отличаться от обещаний застройщика
              </li>
            </ul>
          </div>

          <p className="text-xs text-muted-foreground italic">
            Источник: анализ Telegram канала apartpro (2020-2024), реальная статистика управляющих компаний
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
