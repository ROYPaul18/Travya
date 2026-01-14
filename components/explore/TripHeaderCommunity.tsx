// "use client";

// import { TripWithLocation } from "@/lib/utils/types/types";
// import LikeButton from "../ui/LikeButton";
// import { CopyTripButton } from "../ui/CopyTripButton";

// interface Props {
//   trip: TripWithLocation;
//   isAlreadyLiked: boolean;
// }

// export function TripHeaderCommunity({ trip, isAlreadyLiked }: Props) {
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 gap-3 sm:gap-4">
//       <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-neutral-900">
//         {trip.title}
//       </h1>
//       <div className="flex items-center gap-2">
//         <LikeButton tripId={trip.id} initialFavorited={isAlreadyLiked} />
//         <CopyTripButton tripId={trip.id} />
//       </div>
//     </div>
//   );
// }
