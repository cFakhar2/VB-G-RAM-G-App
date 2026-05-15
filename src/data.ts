export interface Work {
  id: number;
  name: string;
}

export interface SubCategory {
  id: string;
  name: string;
  works: Work[];
}

export interface MasterCategory {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export const DATA: MasterCategory[] = [
  {
    id: "cat1",
    name: "Category 1 - Water Security",
    subCategories: [
      {
        id: "cat1-sub1",
        name: "1). construction of canals, flood or diversion channels, check dams, gully plugs and underground dykes;",
        works: [
          { id: 1, name: "Construction of Boulder Check Dam for Individual" },
          { id: 2, name: "Construction of Boulder Check Dam for Community" },
          { id: 3, name: "Repair & Maintenance of Boulder Check Dam for Community" },
          { id: 4, name: "Construction of Earthen Check Dam for Individual" },
          { id: 5, name: "Construction of Earthen Check Dam for Community" },
          { id: 6, name: "Repair & Maintenance of Earthen Check Dam for Community" },
          { id: 7, name: "Construction of Gabion Check Dam for Individual" },
          { id: 8, name: "Construction of Gabion Check Dam for Community" },
          { id: 9, name: "Repair & Maintenance of Gabion Check Dam for Community" },
          { id: 10, name: "Construction of Masonry Check Dam for Individual" },
          { id: 11, name: "Construction of Masonry Check Dam for Community" },
          { id: 12, name: "Repair & Maintenance of Masonry Check Dam for Community" },
          { id: 13, name: "Construction of Brushwood Gully Plug for Community" },
          { id: 14, name: "Repair & Maintenance of Brushwood Gully Plug for Community" },
          { id: 15, name: "Construction of Earthen Gully Plug for Individual" },
          { id: 16, name: "Construction of Earthen Gully Plug for Community" },
          { id: 17, name: "Repair & Maintenance of Earthen Gully Plug for Community" },
          { id: 18, name: "Construction of Stone Boulder Gully Plug for Individual" },
          { id: 19, name: "Construction of Stone Boulder Gully Plug for Community" },
          { id: 20, name: "Repair & Maintenance of Stone Boulder Gully Plug for Community" },
          { id: 21, name: "Construction of Main Canal for Community" },
          { id: 22, name: "Repair & Maintenance of Main Canal for Community" },
          { id: 23, name: "Construction of Branch Canal for Community" },
          { id: 24, name: "Repair & Maintenance of Branch Canal for Community" },
          { id: 25, name: "Construction of Major Distributary Canal for Community" },
          { id: 26, name: "Repair & Maintenance of Major Distributary Canal for Community" },
          { id: 27, name: "Construction of Minor Distributary Canal for Community" },
          { id: 28, name: "Repair & Maintenance of Minor Distributary Canal for Community" },
          { id: 29, name: "Lining of Canal for Community" },
          { id: 30, name: "Construction of Water Courses and Field Channels for Community" },
          { id: 31, name: "Repair & Maintenance of Water Courses and Field Channels for Community" },
          { id: 32, name: "Construction of Flood or Diversion Channel for Community" },
          { id: 33, name: "Repair & Maintenance of Flood or Diversion Channel for Community" },
          { id: 34, name: "Construction of Flood Diversion Drain for Community" },
          { id: 35, name: "Repair & Maintenance of Flood Diversion Drain for Community" },
          { id: 36, name: "Construction of Underground Dyke for Community" },
          { id: 37, name: "Repair & Maintenance of Underground Dyke for Community" },
          { id: 38, name: "Construction of Storm Water Drain for Community" },
          { id: 39, name: "Repair & Maintenance of Storm Water Drain for Community" }
        ]
      },
      {
        id: "cat1-sub2",
        name: "2). construction or rejuvenation of ponds, percolation tanks, recharge pits, recharge shafts, injection wells and associated water harvesting structures;",
        works: [
          { id: 40, name: "Construction of Collection Chamber for Spring Shed for Community" },
          { id: 41, name: "Repair & Maintenance of Collection Chamber for Spring Shed for Community" },
          { id: 42, name: "Construction of Farm Pond for Individual" },
          { id: 43, name: "Construction of Filtration Chamber for Defunct Borewell for Community" },
          { id: 44, name: "Repair & Maintenance of Filteration Chamber in Defunct Borewell for Community" },
          { id: 45, name: "Construction of Filtration Pond with Recharge Shaft along Escape Channel for Community" },
          { id: 46, name: "Repair & Maintenance of Filtration Pond with Recharge Shaft along Escape Channel for Community" },
          { id: 47, name: "Construction of Injection Well in Channels for Community" },
          { id: 48, name: "Repair & Maintenance of Injection Well in Channels for Community" },
          { id: 49, name: "Construction of Injection Well in Water Bodies for Community" },
          { id: 50, name: "Repair & Maintenance of Injection Well in Water Bodies for Community" },
          { id: 51, name: "Construction of Percolation Tank for Community" },
          { id: 52, name: "Repair & Maintenance of Percolation Tank for Community" },
          { id: 53, name: "Construction of Recharge Pit for Individual" },
          { id: 54, name: "Construction of Recharge Pit for Community" },
          { id: 55, name: "Repair & Maintenance of Recharge Pit for Community" },
          { id: 56, name: "Construction of Recharge Shaft for Individual" },
          { id: 57, name: "Construction of Recharge Shaft for Community" },
          { id: 58, name: "Repair & Maintenance of Recharge Shaft for Community" },
          { id: 59, name: "Rejuvenation of Pond for Community" },
          { id: 60, name: "Rejuvenation of Step Well for Community" },
          { id: 61, name: "Construction of Sand-Filled Groundwater Recharge in Borewell for Individual" },
          { id: 62, name: "Construction of Sand-Filled Groundwater Recharge in Borewell for Community" },
          { id: 63, name: "Repair & Maintenance of Sand Filled Groundwater Recharge in Borewell for Community" },
          { id: 64, name: "Construction of Sand-Filled Groundwater Recharge in Dug Well for Individual" },
          { id: 65, name: "Construction of Sand-Filled Groundwater Recharge in Dug Well for Community" },
          { id: 66, name: "Repair & Maintenance of Sand Filled Groundwater Recharge in Dug Well for Community" },
          { id: 67, name: "Construction of Tanka (Water Storage Structure) for Individual" },
          { id: 68, name: "Repair & Maintenance of Traditional Water Bodies for Community" },
          { id: 69, name: "Construction of Water Harvesting Pond for Community" },
          { id: 70, name: "Repair & Maintenance of Water Harvesting Pond for Community" }
        ]
      },
      {
        id: "cat1-sub3",
        name: "3). irrigation open wells, micro-irrigation channels and field water distribution systems;",
        works: [
          { id: 71, name: "Construction of Drip Irrigation Channels for Community" },
          { id: 72, name: "Construction of Irrigation Channels for Field Distribution for Community" },
          { id: 73, name: "Repair & Maintenance of Irrigation Channels for Field Distribution for Community" },
          { id: 74, name: "Construction of Irrigation Well for Individual" },
          { id: 75, name: "Construction of Irrigation Well for Community" },
          { id: 76, name: "Repair & Maintenance of Irrigation Well for Community" },
          { id: 77, name: "Construction of Irrigation Well for Groups" },
          { id: 78, name: "Repair & Maintenance of Irrigation Well for Groups" },
          { id: 79, name: "Installation of Sprinkler Irrigation System for Community" }
        ]
      },
      {
        id: "cat1-sub4",
        name: "4). reclamation of community waterlogged land;",
        works: [
          { id: 80, name: "Development of Waterlogged Land for Community" },
          { id: 81, name: "Construction of Drainage Works in Waterlogged Land for Individual" },
          { id: 82, name: "Construction of Drainage Works in Waterlogged Land for Community" }
        ]
      },
      {
        id: "cat1-sub5",
        name: "5). afforestation and plantation works linked with soil and moisture conservation; and",
        works: [
          { id: 83, name: "Construction of Continuous Contour Trench for Community" },
          { id: 84, name: "Construction of Staggered Contour Trench for Individual" },
          { id: 85, name: "Construction of Staggered Contour Trench for Community" },
          { id: 86, name: "Plantation in Coastal Area for Community" },
          { id: 87, name: "Bio-drainage Plantation for Individual" },
          { id: 88, name: "Bio-drainage Plantation for Community" },
          { id: 89, name: "Raising of Bamboo Plantation for Community" },
          { id: 90, name: "Raising of Cactus Plantation for Community" },
          { id: 91, name: "Raising of Mangrove Plantation for Community" },
          { id: 92, name: "Plantation in Institutions for Community" },
          { id: 93, name: "Avenue Plantation for Community" },
          { id: 94, name: "Canal Line Plantation for Community" },
          { id: 95, name: "Block Plantation of Forestry Trees in fields for Individual" },
          { id: 96, name: "Line Plantation of Forestry Trees for Community" },
          { id: 97, name: "Along the coast Line Plantation of Forestry Trees for Community" },
          { id: 98, name: "Along the coast Block Plantation of Forestry Trees for Community" },
          { id: 99, name: "Wasteland Block Plantation of Forestry Trees for Community" },
          { id: 100, name: "Line Plantation of Forestry Trees for Individual" },
          { id: 101, name: "Block Plantation of Forestry Trees in fields for Community" },
          { id: 102, name: "Agro Forestry Block Plantation for Individual" },
          { id: 103, name: "Agro Forestry Block Plantation for Community" },
          { id: 104, name: "Agro Forestry Block Plantation in Waste Lands for Community" }
        ]
      },
      {
        id: "cat1-sub6",
        name: "6). rooftop rainwater harvesting and other decentralised recharge systems.",
        works: [
          { id: 105, name: "Construction of Roof Top Rain Water Harvesting Structure for Individual" },
          { id: 106, name: "Construction of Roof Top Rain Water Harvesting Structure for Community" },
          { id: 107, name: "Repair & Maintenance of Roof Top Rain Water Harvesting Structure for Community" }
        ]
      }
    ]
  },
  {
    id: "cat2",
    name: "Category 2 - Core Rural Infrastructure",
    subCategories: [
      {
        id: "cat2-sub1",
        name: "1). construction or upgradation of rural roads, culverts, cross drainage structures and village connectivity facilities;",
        works: [
          { id: 108, name: "Construction of Cross Drainage Structure for Community" },
          { id: 109, name: "Repair & Maintenance of Cross Drainage Structure for Community" },
          { id: 110, name: "Construction of Culvert for Community" },
          { id: 111, name: "Repair & Maintenance of Culvert for Community" },
          { id: 112, name: "Construction of Rural Foot Over Pathway for Community" },
          { id: 113, name: "Repair & Maintenance of Rural Foot Over Pathway for Community" },
          { id: 114, name: "Construction of Bitumen Road for Community" },
          { id: 115, name: "Repair & Maintenance of Bitumen Road for Community" },
          { id: 116, name: "Construction of Cement Concrete Road for Community" },
          { id: 117, name: "Repair & Maintenance of Cement Concrete Road for Community" },
          { id: 118, name: "Construction of Interlocking Paver Block Road for Community" },
          { id: 119, name: "Repair & Maintenance of Interlocking Paver Block Road for Community" },
          { id: 120, name: "Construction of Kharanja Road for Community" },
          { id: 121, name: "Repair & Maintenance of Kharanja Road for Community" },
          { id: 122, name: "Construction of WBM Road for Community" },
          { id: 123, name: "Repair & Maintenance of WBM Road for Community" },
          { id: 124, name: "Construction of Gravel Road (Murrum) for Community" },
          { id: 125, name: "Construction of Mitti Murram Roads for Community" }
        ]
      },
      {
        id: "cat2-sub2",
        name: "2). construction of Gram Panchayat Bhawans, Anganwadi centres, rural libraries and other public buildings;",
        works: [
          { id: 126, name: "Construction of Anganwadi Centre Building for Community" },
          { id: 127, name: "Repair & Maintenance of Anganwadi Centre Building for Community" },
          { id: 128, name: "Construction of Gram Panchayat Building for Community" },
          { id: 129, name: "Repair & Maintenance of Gram Panchayat Building for Community" },
          { id: 130, name: "Repair & Maintenance of Boundary Wall for Government Institutions for Community" },
          { id: 131, name: "Construction of Marriage/Community Hall for Community" },
          { id: 132, name: "Repair & Maintenance of Marriage/Community Hall for Community" },
          { id: 133, name: "Construction of Rural Health Centre for Community" },
          { id: 134, name: "Repair & Maintenance of Rural Health Centre for Community" },
          { id: 135, name: "Construction of Rural Library Building for Community" },
          { id: 136, name: "Repair & Maintenance of Rural Library Building for Community" },
          { id: 137, name: "Construction of Veterinary Health Centre for Community" },
          { id: 138, name: "Repair & Maintenance of Veterinary Health Centre for Community" }
        ]
      },
      {
        id: "cat2-sub3",
        name: "3). construction of school infrastructure, including kitchen sheds, additional classrooms, laboratories, compound walls and playgrounds;",
        works: [
          { id: 139, name: "Construction of Additional Classroom for Government School for Community" },
          { id: 140, name: "Repair & Maintenance of Additional Classroom for Government School for Community" },
          { id: 141, name: "Construction of Compound Wall for Government School for Community" },
          { id: 142, name: "Repair & Maintenance of Compound Wall for Government School for Community" },
          { id: 143, name: "Construction of Kitchen Shed for Government School for Community" },
          { id: 144, name: "Repair & Maintenance of Kitchen Shed for Government School for Community" },
          { id: 145, name: "Construction of Laboratory for Government School for Community" },
          { id: 146, name: "Repair & Maintenance of Laboratory for Government School for Community" },
          { id: 147, name: "Construction of Play Ground for Government School for Community" },
          { id: 148, name: "Repair & Maintenance of Play Ground for Government School for Community" },
          { id: 149, name: "Construction of Toilet for Government School for Community" },
          { id: 150, name: "Repair & Maintenance of Toilet for Government School for Community" }
        ]
      },
      {
        id: "cat2-sub4",
        name: "4). crematoria and community infrastructure;",
        works: [
          { id: 151, name: "Construction of Crematorium for Community" },
          { id: 152, name: "Repair & Maintenance of Crematorium for Community" },
          { id: 153, name: "Construction of Graveyard for Community" },
          { id: 154, name: "Repair & Maintenance of Graveyard for Community" }
        ]
      },
      {
        id: "cat2-sub5",
        name: "5). solid and liquid waste management assets, including stabilising ponds, community sanitary complexes, and waste segregation and collection centres;",
        works: [
          { id: 155, name: "Construction of Recycling Plant (Waste to Wealth) for Community" },
          { id: 156, name: "Repair & Maintenance of Recycling Plant for Community" },
          { id: 157, name: "Construction of Artificial Wetland for Waste Water Management for Community" },
          { id: 158, name: "Repair & Maintenance of Artificial Wetland for Waste Water Management for Community" },
          { id: 159, name: "Construction of Anganwadi Toilet for Community" },
          { id: 160, name: "Repair & Maintenance of Anganwadi Toilet for Community" },
          { id: 161, name: "Construction of Community Sanitary Complex for Community" },
          { id: 162, name: "Repair & Maintenance of Community Sanitary Complex for Community" },
          { id: 163, name: "Construction of IHHL for Individual" },
          { id: 164, name: "Construction of Compost Collection Pit for Community" },
          { id: 165, name: "Construction of Segregation Shed for Community" },
          { id: 166, name: "Repair & Maintenance of Segregation Shed for Community" },
          { id: 167, name: "Construction of Soak Pit for Individual" },
          { id: 168, name: "Construction of Soak Pit for Community" },
          { id: 169, name: "Construction of Soakage Channel for Community" },
          { id: 170, name: "Construction of Liquid Waste Chamber for Individual" },
          { id: 171, name: "Construction of Vertical Greywater Treatment Unit for Community" },
          { id: 172, name: "Construction of Horizontal Greywater Treatment Unit for Community" },
          { id: 173, name: "Construction of Masonry Greywater Drain for Community" },
          { id: 174, name: "Repair & Maintenance of Masonry Greywater Drain for Community" },
          { id: 175, name: "Construction of Aggregate filled Magic Drain for Community" },
          { id: 176, name: "Construction of Stabilisation Pond for Community" },
          { id: 177, name: "Repair & Maintenance of Stabilisation Pond for Community" },
          { id: 178, name: "Construction of Bio-fertilizer Storage Units for Community" },
          { id: 179, name: "Construction of 3/5 Pond for Grey Water Management for Community" }
        ]
      },
      {
        id: "cat2-sub6",
        name: "6). installation of solar lighting systems and other renewable rural energy infrastructure; and",
        works: [
          { id: 180, name: "Construction of Biogas Plant for Individual" },
          { id: 181, name: "Construction of Biogas Plant for Community" },
          { id: 182, name: "Installation of Solar Street Light for Community" }
        ]
      },
      {
        id: "cat2-sub7",
        name: "7). village parking areas, transport sheds and other common rural amenities;",
        works: [
          { id: 183, name: "Construction of Boundary Wall for Government Institutions for Community" },
          { id: 184, name: "Construction of Rural Bus Stand for Community" },
          { id: 185, name: "Repair & Maintenance of Rural Bus Stand for Community" },
          { id: 186, name: "Construction of Parking Shed for Community" },
          { id: 187, name: "Repair & Maintenance of Parking Shed for Community" },
          { id: 188, name: "Construction of Rural Park for Community" },
          { id: 189, name: "Repair & Maintenance of Rural Park for Community" },
          { id: 190, name: "Construction of Sitting Chaupal/Pandal for Community" },
          { id: 191, name: "Repair & Maintenance of Sitting Chaupal/Pandal for Community" },
          { id: 192, name: "Construction of CC/Paver Block Flooring in Community Institutions for Community" },
          { id: 193, name: "Construction of Cattle/Animal Trough for Community" },
          { id: 194, name: "Repair & Maintenance of Cattle/Animal Trough for Community" }
        ]
      },
      {
        id: "cat2-sub8",
        name: "8). rural housing works permissible under the schemes of the Central Government, including those permitted under the Pradhan Mantri Awas Yojana—Gramin;",
        works: [
          { id: 195, name: "Construction of PMAY-G House for Individual" }
        ]
      },
      {
        id: "cat2-sub9",
        name: "9). repair and maintenance of works created under the Jal Jeevan Mission for ensuring water supply.",
        works: [
          { id: 196, name: "Repair & Maintenance of Storage Structure for Water Supply Project (JJM) for Community" },
          { id: 197, name: "Repair & Maintenance of Distribution Structure Water Supply Project (JJM) for Community" }
        ]
      }
    ]
  },
  {
    id: "cat3",
    name: "Category 3 - Rural Livelihood",
    subCategories: [
      {
        id: "cat3-sub1",
        name: "1). construction of training-cum-skill development centres and work sheds for livelihood activities;",
        works: [
          { id: 198, name: "Construction of Training and Skill Development Centre Building for Community" },
          { id: 199, name: "Repair & Maintenance of Training and Skill Development Centre Building for Community" },
          { id: 200, name: "Construction of Workshed for SHG for Community" },
          { id: 201, name: "Repair & Maintenance of Workshed for SHG for Community" },
          { id: 202, name: "Construction of SHE Mart for Community" }
        ]
      },
      {
        id: "cat3-sub2",
        name: "2). rural haats or weekly markets and other market infrastructure;",
        works: [
          { id: 203, name: "Construction of Rural Haat Building for Community" },
          { id: 204, name: "Repair & Maintenance of Rural Haat Building for Community" },
          { id: 205, name: "Construction of Market Yard for Community" },
          { id: 206, name: "Repair & Maintenance of Market Yard for Community" }
        ]
      },
      {
        id: "cat3-sub3",
        name: "3). food grain storage buildings, agricultural produce storage structures, cold storage units and other agri-value chain infrastructure;",
        works: [
          { id: 207, name: "Construction of Agricultural Produce Storage Building for Community" },
          { id: 208, name: "Repair & Maintenance of Agricultural Produce Storage Building for Community" },
          { id: 209, name: "Construction of Cold Storage Unit for Community" },
          { id: 210, name: "Repair & Maintenance of Cold Storage Unit for Community" },
          { id: 211, name: "Construction of Food Grain Storage Building for Community" },
          { id: 212, name: "Repair & Maintenance of Food Grain Storage Building for Community" },
          { id: 213, name: "Construction of Multi Purpose Agriculture Platform for Community" },
          { id: 214, name: "Raised Platform for Paddy for Community" }
        ]
      },
      {
        id: "cat3-sub4",
        name: "4). buildings for Self Help Groups and federation level institutions;",
        works: [
          { id: 215, name: "Construction of SHG Building for Community" },
          { id: 216, name: "Repair & Maintenance SHG Building for Community" },
          { id: 217, name: "Construction of Cluster-level federation (CLF) Building for Community" },
          { id: 218, name: "Repair & Maintenance Federation Building for Community" }
        ]
      },
      {
        id: "cat3-sub5",
        name: "5). compost structures, including vermicompost and NADEP units;",
        works: [
          { id: 219, name: "Construction of Berkeley Compost Pit for Community" },
          { id: 220, name: "Construction of Berkeley Compost Pit for Individual" },
          { id: 221, name: "Construction of Compost Pit for Community" },
          { id: 222, name: "Construction of NADEP Compost Pit for Community" },
          { id: 223, name: "Construction of NADEP Compost Pit for Individual" },
          { id: 224, name: "Construction of NADEP Compost Pit for Groups" },
          { id: 225, name: "Construction of Compost Pit for Individual" },
          { id: 226, name: "Construction of Vermi Compost Structure for Community" },
          { id: 227, name: "Construction of Vermi Compost Structure for Individual" },
          { id: 228, name: "Construction of Vermi Compost Structure for Groups" }
        ]
      },
      {
        id: "cat3-sub6",
        name: "6). development of silvipasture grasslands, dairy infrastructure and shelters for cattle, goats, pigs, poultry and other livestock;",
        works: [
          { id: 229, name: "Construction of Cattle Shelter for Community" },
          { id: 230, name: "Construction of Cattle Shelter for Individual" },
          { id: 231, name: "Repair & Maintenance of Cattle Shelter for Community" },
          { id: 232, name: "Raising of Fodder Cultivation for Community" },
          { id: 233, name: "Construction of Goat Shelter for Community" },
          { id: 234, name: "Construction of Goat Shelter for Individual" },
          { id: 235, name: "Repair & Maintenance of Goat Shelter for Community" },
          { id: 236, name: "Construction of Milk Collection Centre for Community" },
          { id: 237, name: "Repair & Maintenance of Milk Collection Centre for Community" },
          { id: 238, name: "Construction of Piggery Shed for Community" },
          { id: 239, name: "Construction of Piggery Shed for Individual" },
          { id: 240, name: "Repair & Maintenance of Piggery Shed for Community" },
          { id: 241, name: "Construction of Poultry Shelter for Community" },
          { id: 242, name: "Construction of Poultry Shelter for Individual" },
          { id: 243, name: "Repair & Maintenance of Poultry Shelter for Community" }
        ]
      },
      {
        id: "cat3-sub7",
        name: "7). fisheries-related infrastructure, including fish drying yards;",
        works: [
          { id: 244, name: "Construction of Aquaculture Structure for Shrimp Farming for Community" },
          { id: 245, name: "Repair & Maintenance of Aquaculture Structure for Shrimp Farming for Community" },
          { id: 246, name: "Construction of Aquaculture Structure for Fish Farming for Community" },
          { id: 247, name: "Repair & Maintenance of Aquaculture Structure for Fish Farming for Community" },
          { id: 248, name: "Construction of Aquaculture Structure for Crab Farming for Community" },
          { id: 249, name: "Repair & Maintenance of Aquaculture Structure for Crab Farming for Community" },
          { id: 250, name: "Construction of Fish Drying Yard for Community" },
          { id: 251, name: "Construction of Fishery Pond for Community" },
          { id: 252, name: "Repair & Maintenance of Fishery Pond for Community" }
        ]
      },
      {
        id: "cat3-sub8",
        name: "8). raising of nurseries and production of building material; and",
        works: [
          { id: 253, name: "Tea Plantation in Community Wasteland for Community" },
          { id: 254, name: "Tea Plantation in Wasteland for Individual" },
          { id: 255, name: "Coffee Plantation in Community Wasteland for Community" },
          { id: 256, name: "Coffee Plantation in Wasteland for Individual" },
          { id: 257, name: "Construction of Sericulture Shed for Community" },
          { id: 258, name: "Production of Building Material for Community" },
          { id: 259, name: "Raising of Nursery for Community" },
          { id: 260, name: "Block Plantation of Horticulture Trees in fields for Individual" },
          { id: 261, name: "Line Plantation of Horticulture Trees for Community" },
          { id: 262, name: "Along the coast Line Plantation of Horticulture Trees for Community" },
          { id: 263, name: "Along the coast Block Plantation of Horticulture Trees for Community" },
          { id: 264, name: "Wasteland Block Plantation of Horticulture Trees for Community" },
          { id: 265, name: "Line Plantation of Horticulture Trees for Individuals" },
          { id: 266, name: "Block Plantation of Horticulture Trees in fields for Community" },
          { id: 267, name: "Block Plantation of Sericulture Trees in fields for Individual" },
          { id: 268, name: "Along the coast Block Plantation of Sericulture Trees for Community" },
          { id: 269, name: "Wasteland Block Plantation of Sericulture Trees for Community" },
          { id: 270, name: "Block Plantation of Sericulture Trees in fields for Community" },
          { id: 271, name: "Block Plantation of Medicinal Trees in fields for Individual" },
          { id: 272, name: "Along the coast Block Plantation of Medicinal Trees for Community" },
          { id: 273, name: "Wasteland Block Plantation of Medicinal Trees for Community" },
          { id: 274, name: "Block Plantation of Medicinal Trees in fields for Community" }
        ]
      },
      {
        id: "cat3-sub9",
        name: "9). Integrated projects promoting circular and cyclical economy models, as may be approved by the Central Government.",
        works: [
          { id: 275, name: "Construction of Mini Flour Mill Processing Unit for Community" },
          { id: 276, name: "Construction of Cashew Processing Unit for Community" },
          { id: 277, name: "Construction of Oil Seed Processing Unit for Community" },
          { id: 278, name: "Construction of Integrated Agro Processing Unit (Cleaning/Grading/Packaging) for Community" },
          { id: 279, name: "Construction of Forest Produce Processing Unit for Community" },
          { id: 280, name: "Construction of Handloom Processing Unit for Community" },
          { id: 281, name: "Construction of Hot Press Biodegradable Processing Unit (Plates/Bowls) for Community" },
          { id: 282, name: "Construction of Bamboo Craft Processing Unit for Community" },
          { id: 283, name: "Construction of Other Processing Unit for Community" }
        ]
      }
    ]
  },
  {
    id: "cat4",
    name: "Category 4 - Disaster",
    subCategories: [
      {
        id: "cat4-sub1",
        name: "1). construction of cyclone shelters, flood shelters and multipurpose disaster resilient structures;",
        works: [
          { id: 284, name: "Construction of Cyclone Shelter for Community" },
          { id: 285, name: "Repair & Maintenance of Cyclone Shelters for Community" },
          { id: 286, name: "Construction of Flood Relief Shelter for Community" },
          { id: 287, name: "Repair & Maintenance of Flood Relief Shelter for Community" }
        ]
      },
      {
        id: "cat4-sub2",
        name: "2). construction of diversion channels, embankments and other disaster-mitigation works;",
        works: [
          { id: 288, name: "Construction of Embankment for Community" },
          { id: 289, name: "Strengthening of Embankment for Community" },
          { id: 290, name: "Construction of Earthen Spur for Community" },
          { id: 291, name: "Repair & Maintenance of Earthen Spur for Community" },
          { id: 292, name: "Construction of Gabion Spur for Community" },
          { id: 293, name: "Repair & Maintenance of Gabion Spur for Community" },
          { id: 294, name: "Construction of Stone Spur for Community" },
          { id: 295, name: "Repair & Maintenance of Stone Spur for Community" },
          { id: 296, name: "Construction of Flood Protection Wall for Community" },
          { id: 297, name: "Repair & Maintenance of Flood protection wall for Community" },
          { id: 298, name: "Construction of Masonry Bund for Individual" },
          { id: 299, name: "Construction of Level Bench Terrace for Community" },
          { id: 300, name: "Construction of Level Bench Terrace for Individual" },
          { id: 301, name: "Construction of Upland Bench Terrace for Community" },
          { id: 302, name: "Construction of Upland Bench Terrace for Individual" },
          { id: 303, name: "Construction of Earthen Retaining Wall for Community" },
          { id: 304, name: "Repair & Maintenance of Earthen Retaining Wall for Community" },
          { id: 305, name: "Construction of Stone/Gabion Retaining Wall for Community" },
          { id: 306, name: "Repair & Maintenance of Stone/Gabion Retaining Wall for Community" },
          { id: 307, name: "Construction of Masonry Retaining Wall for Community" },
          { id: 308, name: "Repair & Maintenance of Masonry Retaining Wall for Community" },
          { id: 309, name: "Construction of RCC Retaining Wall for Community" },
          { id: 310, name: "Repair & Maintenance of RCC Retaining Wall for Community" }
        ]
      },
      {
        id: "cat4-sub4",
        name: "4). post-disaster rehabilitation, restoration and repair of rural roads and community assets;",
        works: [
          { id: 311, name: "Post-Disaster Restoration of Rural Roads for Community" },
          { id: 312, name: "Post-Disaster Restoration of Other Community Assests for Community" },
          { id: 313, name: "Post-Disaster Restoration of Community Building Assests for Community" }
        ]
      },
      {
        id: "cat4-sub5",
        name: "5). windbreak and shelterbelt plantations; and",
        works: [
          { id: 314, name: "Shelterbelt Plantation for Community" }
        ]
      },
      {
        id: "cat4-sub6",
        name: "6). forest fire management works, including fire breaks, fuel buffer zones and allied measures.",
        works: [
          { id: 315, name: "Construction of Animal Protection Trenches for Community" },
          { id: 316, name: "Raising of Fire Break Hedges for Community" },
          { id: 317, name: "Construction of Forest Fire Line for Community" },
          { id: 318, name: "Raising of Fuel Buffer Zone for Community" }
        ]
      }
    ]
  }
];
