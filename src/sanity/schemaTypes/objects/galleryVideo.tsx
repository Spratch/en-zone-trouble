import { VideoIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryVideo",
  title: "Vidéo",
  type: "object",
  icon: VideoIcon,
  fields: [
    defineField({
      name: "video",
      title: "Vidéo",
      type: "mux.video",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "caption",
      title: "Légende",
      type: "string",
      description:
        "Si besoin d'accompagner la vidéo d'informations supplémentaires, entrer une légende courte. Les légendes seront affichées séparément de la galerie.",
      validation: (Rule) =>
        Rule.max(100).warning(
          "Une légende trop longue perdra en lisibilité et en harmonie visuelle."
        )
    })
  ],
  preview: {
    select: {
      title: "video.asset.filename",
      caption: "caption",
      duration: "video.asset.data.duration",
      playbackId: "video.asset.playbackId"
    },
    prepare(selection) {
      const { title, caption, duration, playbackId } = selection;
      console.log(selection);
      return {
        title: title || "Vidéo",
        subtitle: `Durée: ${Math.floor(duration / 60)}:${Math.floor(
          duration % 60
        )
          .toString()
          .padStart(2, "0")}${caption ? ` - ${caption}` : ""}`,
        media: (
          <img
            src={`https://image.mux.com/${playbackId}/thumbnail.jpg?width=200&height=200&fit_mode=crop`}
            alt=""
          />
        )
      };
    }
  }
});
