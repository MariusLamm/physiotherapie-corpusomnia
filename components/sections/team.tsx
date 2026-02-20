"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { teamMembers } from "@/lib/data/team";
import { Award, Languages } from "lucide-react";
import { useTranslations } from "next-intl";

export function Team() {
  const t = useTranslations("team");
  const tMembers = useTranslations("teamMembers");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-12 md:py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">{t("title")}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Team Member Photo */}
                      <div className="w-full max-h-[300px] md:max-h-none md:w-56 relative rounded-lg overflow-hidden flex-shrink-0 aspect-[4/3] md:aspect-[2/3]">
                        <Image
                          src={member.image || "/team/goncagul-erol.jpg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 224px"
                        />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                          <p className="text-muted-foreground">{tMembers(`${member.id}.title`)}</p>
                        </div>

                        <div className="flex items-start gap-3">
                          <Languages className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium mb-1">{t("languages")}</p>
                            <div className="flex flex-wrap gap-2">
                              {member.languageKeys.map((langKey) => (
                                <Badge key={langKey} variant="secondary">
                                  {tMembers(langKey)}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-primary" />
                            <span className="font-medium">
                              {t("qualifications")}
                            </span>
                          </div>
                          <ul className="space-y-2 pt-2">
                            {member.qualificationKeys.map((qualKey, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-muted-foreground"
                              >
                                <span className="text-primary mt-1">&bull;</span>
                                <span>{tMembers(qualKey)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
