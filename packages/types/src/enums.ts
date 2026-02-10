export type RarityRating =
  | "COMMON"
  | "UNCOMMON"
  | "RARE"
  | "VERY_RARE"
  | "ULTRA_RARE"
  | "CHASE"
  | "ONE_OF_ONE";

export type ConditionGrade =
  | "GEM_MINT"
  | "MINT"
  | "NEAR_MINT_MINT"
  | "NEAR_MINT"
  | "EXCELLENT"
  | "VERY_GOOD"
  | "GOOD"
  | "FAIR"
  | "POOR";

export type ListingType = "SALE" | "TRADE" | "AUCTION";

export type ListingStatus = "DRAFT" | "ACTIVE" | "SOLD" | "EXPIRED" | "CANCELLED";

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAYMENT_HELD"
  | "SHIPPED"
  | "DELIVERED"
  | "COMPLETED"
  | "DISPUTED"
  | "REFUNDED"
  | "CANCELLED";

export type AuctionStatus = "SCHEDULED" | "LIVE" | "ENDED" | "CANCELLED";

export type AuctionType = "CURATED" | "SELLER";

export type PostType = "WANTED" | "SHOWCASE" | "DISCUSSION";

export type EventType = "VIRTUAL_MEETUP" | "SWAP_MEET" | "CONTEST" | "RELEASE_DAY";
