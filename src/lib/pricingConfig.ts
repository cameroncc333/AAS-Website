// Pricing coefficients ported from aas-pricing-model/config.py
// Crew = owner-operators → labor not a direct cost at job level
// Job-level margin = (Revenue - Direct Costs) / Revenue ≈ 83–93%

export const FUEL_PRICE_PER_GALLON = 3.25
export const VEHICLE_MPG = 13.9
export const EQUIPMENT_COST_PER_HOUR = 0.18
export const PRICE_MULTIPLIER = 2.3
export const DEMAND_COEFFICIENT_DEFAULT = 1.0

export const MIN_MARGINS: Record<string, number> = {
  pressure_washing: 0.70,
  moving:           0.65,
  auto_detailing:   0.75,
  boat_detailing:   0.75,
  landscaping:      0.60,
  labor_specialty:  0.70,
}

export const TIER_MULTIPLIERS = { good: 0.85, better: 1.00, best: 1.30 }

// Service input parameters
export const SERVICE_PARAMS: Record<string, {
  label: string
  inputLabel: string
  inputUnit: string
  inputMin: number
  inputMax: number
  inputStep: number
  inputDefault: number
  chemicalsPerUnit: number
  timePerUnit: number
  typicalCrew: number
  equipHoursPerUnit: number
}> = {
  pressure_washing: {
    label: 'Pressure Washing',
    inputLabel: 'Square footage',
    inputUnit: 'sq ft',
    inputMin: 200,
    inputMax: 8000,
    inputStep: 100,
    inputDefault: 1000,
    chemicalsPerUnit: 0.0008,  // per sqft
    timePerUnit: 0.00150,      // hours per sqft
    typicalCrew: 2,
    equipHoursPerUnit: 0.00150,
  },
  moving: {
    label: 'Moving',
    inputLabel: 'Number of rooms',
    inputUnit: 'rooms',
    inputMin: 1,
    inputMax: 8,
    inputStep: 1,
    inputDefault: 3,
    chemicalsPerUnit: 5.0,     // supplies per room
    timePerUnit: 0.75,         // hours per room
    typicalCrew: 3,
    equipHoursPerUnit: 0,
  },
  auto_detailing: {
    label: 'Auto Detailing',
    inputLabel: 'Number of vehicles',
    inputUnit: 'vehicles',
    inputMin: 1,
    inputMax: 4,
    inputStep: 1,
    inputDefault: 1,
    chemicalsPerUnit: 8.0,
    timePerUnit: 2.5,
    typicalCrew: 2,
    equipHoursPerUnit: 0.5,
  },
  boat_detailing: {
    label: 'Boat Detailing',
    inputLabel: 'Boat length',
    inputUnit: 'ft',
    inputMin: 15,
    inputMax: 50,
    inputStep: 1,
    inputDefault: 25,
    chemicalsPerUnit: 0.6,     // per foot
    timePerUnit: 0.35,
    typicalCrew: 2,
    equipHoursPerUnit: 0.2,
  },
  landscaping: {
    label: 'Landscaping',
    inputLabel: 'Bags of material',
    inputUnit: 'bags',
    inputMin: 5,
    inputMax: 100,
    inputStep: 5,
    inputDefault: 20,
    chemicalsPerUnit: 6.50,    // materials per bag
    timePerUnit: 0.20,
    typicalCrew: 2,
    equipHoursPerUnit: 0,
  },
  labor_specialty: {
    label: 'Labor / Specialty',
    inputLabel: 'Estimated hours',
    inputUnit: 'hrs',
    inputMin: 1,
    inputMax: 12,
    inputStep: 0.5,
    inputDefault: 3,
    chemicalsPerUnit: 0,
    timePerUnit: 1.0,
    typicalCrew: 2,
    equipHoursPerUnit: 0,
  },
}

// Estimate distance from zip (rough Atlanta Metro lookup)
export function estimateDistanceMiles(zip: string): number {
  const zipMap: Record<string, number> = {
    '30517': 5,  '30518': 8,  '30024': 12, '30519': 10,
    '30047': 22, '30045': 18, '30044': 25, '30043': 20,
    '30033': 35, '30030': 32, '30060': 28, '30501': 40,
    '30506': 42, '30507': 45, '30523': 60, '30620': 38,
  }
  return zipMap[zip] ?? 20 // default 20mi if zip unknown
}

export function computeQuote(
  serviceKey: string,
  sizeInput: number,
  distanceMiles: number,
  demandCoeff = DEMAND_COEFFICIENT_DEFAULT,
): { good: number; better: number; best: number; directCost: number; margin: number } {
  const params = SERVICE_PARAMS[serviceKey]
  if (!params) throw new Error(`Unknown service: ${serviceKey}`)

  const fuelCost    = (distanceMiles * 2) / VEHICLE_MPG * FUEL_PRICE_PER_GALLON
  const materials   = params.chemicalsPerUnit * sizeInput
  const equipHours  = params.equipHoursPerUnit * sizeInput
  const equipCost   = equipHours * EQUIPMENT_COST_PER_HOUR
  const directCost  = fuelCost + materials + equipCost

  const baseQuote   = Math.max(directCost * PRICE_MULTIPLIER * demandCoeff, 50)
  const minQuote    = directCost / (1 - MIN_MARGINS[serviceKey])

  const better      = Math.ceil(Math.max(baseQuote, minQuote) / 5) * 5
  const good        = Math.ceil(better * TIER_MULTIPLIERS.good / 5) * 5
  const best        = Math.ceil(better * TIER_MULTIPLIERS.best / 5) * 5
  const margin      = (better - directCost) / better

  return { good, better, best, directCost, margin }
}
