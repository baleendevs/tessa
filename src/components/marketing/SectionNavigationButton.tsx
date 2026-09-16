import { ArrowIcon } from "./MarketingIcons";

type SectionNavigationButtonProps = {
  backToTopLabel: string;
  nextSectionLabel: string;
  sectionIds: readonly string[];
};

const LANDING_GAP = 12;
const SECTION_START_TOLERANCE = 16;

function inlineJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function SectionNavigationButton({
  backToTopLabel,
  nextSectionLabel,
  sectionIds,
}: SectionNavigationButtonProps) {
  const bootstrapSource = `
(function () {
  var button = document.querySelector("[data-section-navigation]");
  if (!button || button.dataset.sectionNavigationReady === "true") return;

  var sectionIds = ${inlineJson(sectionIds)};
  var nextLabel = ${inlineJson(nextSectionLabel)};
  var backLabel = ${inlineJson(backToTopLabel)};
  var landingGap = ${LANDING_GAP};
  var sectionStartTolerance = ${SECTION_START_TOLERANCE};
  var frame = 0;

  function getHeaderBottom() {
    var header = document.querySelector(".marketing-header");
    return header ? header.getBoundingClientRect().bottom : 0;
  }

  function getSections() {
    var sections = [];
    for (var index = 0; index < sectionIds.length; index += 1) {
      var section = document.getElementById(sectionIds[index]);
      if (section) sections.push(section);
    }
    return sections;
  }

  function hasReachedFinalSection(sections) {
    var finalSection = sections[sections.length - 1];
    if (!finalSection) return false;

    var nearPageEnd = window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight - 2;
    return nearPageEnd || finalSection.getBoundingClientRect().top <= getHeaderBottom() + sectionStartTolerance;
  }

  function updateDirection() {
    var atFinalSection = hasReachedFinalSection(getSections());
    var label = atFinalSection ? backLabel : nextLabel;
    button.dataset.direction = atFinalSection ? "up" : "down";
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  }

  function scheduleDirectionUpdate() {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(updateDirection);
  }

  function scrollToPosition(top) {
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      window.scrollTo(0, top);
      return;
    }

    try {
      window.scrollTo({ behavior: "smooth", left: 0, top: top });
    } catch (_) {
      window.scrollTo(0, top);
    }
  }

  button.addEventListener("click", function () {
    var sections = getSections();
    if (hasReachedFinalSection(sections)) {
      scrollToPosition(0);
      return;
    }

    var headerBottom = getHeaderBottom();
    var nextSection = null;
    for (var index = 0; index < sections.length; index += 1) {
      if (sections[index].getBoundingClientRect().top > headerBottom + sectionStartTolerance) {
        nextSection = sections[index];
        break;
      }
    }
    if (!nextSection) return;

    var targetTop = window.pageYOffset + nextSection.getBoundingClientRect().top - headerBottom - landingGap;
    scrollToPosition(Math.max(0, targetTop));
  });

  window.addEventListener("resize", scheduleDirectionUpdate);
  window.addEventListener("scroll", scheduleDirectionUpdate, { passive: true });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateDirection, { once: true });
  }
  button.dataset.sectionNavigationReady = "true";
  updateDirection();
})();`;

  return (
    <>
      <button
        aria-label={nextSectionLabel}
        className="header-section-nav"
        data-direction="down"
        data-section-navigation
        suppressHydrationWarning
        title={nextSectionLabel}
        type="button"
      >
        <ArrowIcon />
      </button>
      <script
        dangerouslySetInnerHTML={{ __html: bootstrapSource }}
        id="tessa-section-navigation-bootstrap"
      />
    </>
  );
}
