export const dsaQuestions = [
  {
    "id": "dsa-01",
    "title": "Two Sum",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    "examples": [
      {
        "input": "[[2, 7, 11, 15], 9]",
        "output": "[0, 1]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def two_sum(nums: list, target: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            2,
            7,
            11,
            15
          ],
          9
        ],
        "expected": [
          0,
          1
        ]
      },
      {
        "input": [
          [
            3,
            2,
            4
          ],
          6
        ],
        "expected": [
          1,
          2
        ]
      },
      {
        "input": [
          [
            3,
            3
          ],
          6
        ],
        "expected": [
          0,
          1
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def two_sum(nums: list, target: int) -> list:\n    \n    seen = {}\n    for i, x in enumerate(nums):\n        if target - x in seen: return [seen[target - x], i]\n        seen[x] = i\n    return []",
      "explanation": "Classic interview DSA question tested using Arrays patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-02",
    "title": "Best Time to Buy and Sell Stock",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Return the maximum profit you can achieve from buying once and selling once.",
    "examples": [
      {
        "input": "[[7, 1, 5, 3, 6, 4]]",
        "output": "5"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def max_profit(prices: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            7,
            1,
            5,
            3,
            6,
            4
          ]
        ],
        "expected": 5
      },
      {
        "input": [
          [
            7,
            6,
            4,
            3,
            1
          ]
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def max_profit(prices: list) -> int:\n    \n    min_p = float('inf')\n    max_pr = 0\n    for p in prices:\n        min_p = min(min_p, p)\n        max_pr = max(max_pr, p - min_p)\n    return max_pr",
      "explanation": "Classic interview DSA question tested using Arrays patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-03",
    "title": "Contains Duplicate",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Hash Maps & Dicts",
    "description": "Given an integer array nums, return true if any value appears at least twice in the array.",
    "examples": [
      {
        "input": "[[1, 2, 3, 1]]",
        "output": "True"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def contains_duplicate(nums: list) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            1
          ]
        ],
        "expected": true
      },
      {
        "input": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": false
      },
      {
        "input": [
          [
            1,
            1,
            1,
            3,
            3,
            4,
            3,
            2,
            4,
            2
          ]
        ],
        "expected": true
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def contains_duplicate(nums: list) -> bool:\n    \n    return len(nums) != len(set(nums))",
      "explanation": "Classic interview DSA question tested using Hash Maps & Dicts patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-04",
    "title": "Maximum Subarray (Kadane's Algorithm)",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Find the subarray with the largest sum and return its sum.",
    "examples": [
      {
        "input": "[[-2, 1, -3, 4, -1, 2, 1, -5, 4]]",
        "output": "6"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def max_sub_array(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            -2,
            1,
            -3,
            4,
            -1,
            2,
            1,
            -5,
            4
          ]
        ],
        "expected": 6
      },
      {
        "input": [
          [
            1
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            5,
            4,
            -1,
            7,
            8
          ]
        ],
        "expected": 23
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def max_sub_array(nums: list) -> int:\n    \n    max_s = cur_s = nums[0]\n    for x in nums[1:]:\n        cur_s = max(x, cur_s + x)\n        max_s = max(max_s, cur_s)\n    return max_s",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-05",
    "title": "Valid Anagram",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Hash Maps & Dicts",
    "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    "examples": [
      {
        "input": "['anagram', 'nagaram']",
        "output": "True"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def is_anagram(s: str, t: str) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "anagram",
          "nagaram"
        ],
        "expected": true
      },
      {
        "input": [
          "rat",
          "car"
        ],
        "expected": false
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def is_anagram(s: str, t: str) -> bool:\n    \n    return sorted(s) == sorted(t)",
      "explanation": "Classic interview DSA question tested using Hash Maps & Dicts patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-06",
    "title": "3Sum",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "description": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0.",
    "examples": [
      {
        "input": "[[-1, 0, 1, 2, -1, -4]]",
        "output": "[[-1, -1, 2], [-1, 0, 1]]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def three_sum(nums: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            -1,
            0,
            1,
            2,
            -1,
            -4
          ]
        ],
        "expected": [
          [
            -1,
            -1,
            2
          ],
          [
            -1,
            0,
            1
          ]
        ]
      },
      {
        "input": [
          [
            0,
            1,
            1
          ]
        ],
        "expected": []
      },
      {
        "input": [
          [
            0,
            0,
            0
          ]
        ],
        "expected": [
          [
            0,
            0,
            0
          ]
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def three_sum(nums: list) -> list:\n    \n    nums.sort()\n    res = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i-1]: continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s < 0: l += 1\n            elif s > 0: r -= 1\n            else:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l+1]: l += 1\n                while l < r and nums[r] == nums[r-1]: r -= 1\n                l += 1; r -= 1\n    return res",
      "explanation": "Classic interview DSA question tested using Two Pointers patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-07",
    "title": "Container With Most Water",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "description": "Find two lines that together with the x-axis form a container that contains the most water.",
    "examples": [
      {
        "input": "[[1, 8, 6, 2, 5, 4, 8, 3, 7]]",
        "output": "49"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def max_area(height: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            8,
            6,
            2,
            5,
            4,
            8,
            3,
            7
          ]
        ],
        "expected": 49
      },
      {
        "input": [
          [
            1,
            1
          ]
        ],
        "expected": 1
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def max_area(height: list) -> int:\n    \n    l, r = 0, len(height) - 1\n    max_w = 0\n    while l < r:\n        max_w = max(max_w, min(height[l], height[r]) * (r - l))\n        if height[l] < height[r]: l += 1\n        else: r -= 1\n    return max_w",
      "explanation": "Classic interview DSA question tested using Two Pointers patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-08",
    "title": "Longest Substring Without Repeating Characters",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "description": "Given a string s, find the length of the longest substring without repeating characters.",
    "examples": [
      {
        "input": "['abcabcbb']",
        "output": "3"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def length_of_longest_substring(s: str) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "abcabcbb"
        ],
        "expected": 3
      },
      {
        "input": [
          "bbbbb"
        ],
        "expected": 1
      },
      {
        "input": [
          "pwwkew"
        ],
        "expected": 3
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def length_of_longest_substring(s: str) -> int:\n    \n    seen = {}\n    l = max_l = 0\n    for r, ch in enumerate(s):\n        if ch in seen and seen[ch] >= l:\n            l = seen[ch] + 1\n        seen[ch] = r\n        max_l = max(max_l, r - l + 1)\n    return max_l",
      "explanation": "Classic interview DSA question tested using Sliding Window patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-09",
    "title": "Longest Repeating Character Replacement",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "description": "Return the length of the longest substring containing the same letter you can get after changing at most k characters.",
    "examples": [
      {
        "input": "['ABAB', 2]",
        "output": "4"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def character_replacement(s: str, k: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "ABAB",
          2
        ],
        "expected": 4
      },
      {
        "input": [
          "AABABBA",
          1
        ],
        "expected": 4
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def character_replacement(s: str, k: int) -> int:\n    \n    from collections import defaultdict\n    count = defaultdict(int)\n    max_f = l = 0\n    for r in range(len(s)):\n        count[s[r]] += 1\n        max_f = max(max_f, count[s[r]])\n        if (r - l + 1) - max_f > k:\n            count[s[l]] -= 1\n            l += 1\n    return len(s) - l",
      "explanation": "Classic interview DSA question tested using Sliding Window patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-10",
    "title": "Minimum Window Substring",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "description": "Given two strings s and t, return the minimum window substring of s such that every character in t is included in the window.",
    "examples": [
      {
        "input": "['ADOBECODEBANC', 'ABC']",
        "output": "BANC"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def min_window(s: str, t: str) -> str:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "ADOBECODEBANC",
          "ABC"
        ],
        "expected": "BANC"
      },
      {
        "input": [
          "a",
          "a"
        ],
        "expected": "a"
      },
      {
        "input": [
          "a",
          "aa"
        ],
        "expected": ""
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def min_window(s: str, t: str) -> str:\n    \n    from collections import Counter\n    if not t or not s: return ''\n    t_count = Counter(t)\n    required = len(t_count)\n    l = r = formed = 0\n    w_count = {}\n    ans = float('inf'), None, None\n    while r < len(s):\n        ch = s[r]\n        w_count[ch] = w_count.get(ch, 0) + 1\n        if ch in t_count and w_count[ch] == t_count[ch]: formed += 1\n        while l <= r and formed == required:\n            if (r - l + 1) < ans[0]: ans = (r - l + 1, l, r)\n            w_count[s[l]] -= 1\n            if s[l] in t_count and w_count[s[l]] < t_count[s[l]]: formed -= 1\n            l += 1\n        r += 1\n    return '' if ans[0] == float('inf') else s[ans[1]:ans[2]+1]",
      "explanation": "Classic interview DSA question tested using Sliding Window patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-11",
    "title": "Search in Rotated Sorted Array",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "description": "Given the array nums sorted in ascending order and rotated at an unknown pivot, find the index of target in O(log n).",
    "examples": [
      {
        "input": "[[4, 5, 6, 7, 0, 1, 2], 0]",
        "output": "4"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def search_rotated(nums: list, target: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            4,
            5,
            6,
            7,
            0,
            1,
            2
          ],
          0
        ],
        "expected": 4
      },
      {
        "input": [
          [
            4,
            5,
            6,
            7,
            0,
            1,
            2
          ],
          3
        ],
        "expected": -1
      },
      {
        "input": [
          [
            1
          ],
          0
        ],
        "expected": -1
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def search_rotated(nums: list, target: int) -> int:\n    \n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]: r = mid - 1\n            else: l = mid + 1\n        else:\n            if nums[mid] < target <= nums[r]: l = mid + 1\n            else: r = mid - 1\n    return -1",
      "explanation": "Classic interview DSA question tested using Binary Search patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-12",
    "title": "Find Minimum in Rotated Sorted Array",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "description": "Find the minimum element in a sorted rotated array in O(log n) time.",
    "examples": [
      {
        "input": "[[3, 4, 5, 1, 2]]",
        "output": "1"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def find_min(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            3,
            4,
            5,
            1,
            2
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6,
            7,
            0,
            1,
            2
          ]
        ],
        "expected": 0
      },
      {
        "input": [
          [
            11,
            13,
            15,
            17
          ]
        ],
        "expected": 11
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def find_min(nums: list) -> int:\n    \n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[r]: l = mid + 1\n        else: r = mid\n    return nums[l]",
      "explanation": "Classic interview DSA question tested using Binary Search patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-13",
    "title": "Binary Search (Standard)",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "description": "Given an array of integers nums which is sorted in ascending order, and an integer target, return target index or -1.",
    "examples": [
      {
        "input": "[[-1, 0, 3, 5, 9, 12], 9]",
        "output": "4"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def binary_search(nums: list, target: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def binary_search(nums: list, target: int) -> int:\n    \n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: l = mid + 1\n        else: r = mid - 1\n    return -1",
      "explanation": "Classic interview DSA question tested using Binary Search patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-14",
    "title": "Search Insert Position",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "description": "Given a sorted array of distinct integers and a target value, return the index if target is found or where it would be inserted.",
    "examples": [
      {
        "input": "[[1, 3, 5, 6], 5]",
        "output": "2"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def search_insert(nums: list, target: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            3,
            5,
            6
          ],
          5
        ],
        "expected": 2
      },
      {
        "input": [
          [
            1,
            3,
            5,
            6
          ],
          2
        ],
        "expected": 1
      },
      {
        "input": [
          [
            1,
            3,
            5,
            6
          ],
          7
        ],
        "expected": 4
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def search_insert(nums: list, target: int) -> int:\n    \n    import bisect\n    return bisect.bisect_left(nums, target)",
      "explanation": "Classic interview DSA question tested using Binary Search patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-15",
    "title": "First and Last Position of Element in Sorted Array",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "description": "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.",
    "examples": [
      {
        "input": "[[5, 7, 7, 8, 8, 10], 8]",
        "output": "[3, 4]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def search_range(nums: list, target: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            5,
            7,
            7,
            8,
            8,
            10
          ],
          8
        ],
        "expected": [
          3,
          4
        ]
      },
      {
        "input": [
          [
            5,
            7,
            7,
            8,
            8,
            10
          ],
          6
        ],
        "expected": [
          -1,
          -1
        ]
      },
      {
        "input": [
          [],
          0
        ],
        "expected": [
          -1,
          -1
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def search_range(nums: list, target: int) -> list:\n    \n    import bisect\n    l = bisect.bisect_left(nums, target)\n    r = bisect.bisect_right(nums, target) - 1\n    if l <= r and l < len(nums) and nums[l] == target: return [l, r]\n    return [-1, -1]",
      "explanation": "Classic interview DSA question tested using Binary Search patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-16",
    "title": "Reverse Linked List",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Linked List",
    "description": "Given the head of a singly linked list represented as an array of values, return the reversed values.",
    "examples": [
      {
        "input": "[[1, 2, 3, 4, 5]]",
        "output": "[5, 4, 3, 2, 1]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def reverse_list(values: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            5
          ]
        ],
        "expected": [
          5,
          4,
          3,
          2,
          1
        ]
      },
      {
        "input": [
          [
            1,
            2
          ]
        ],
        "expected": [
          2,
          1
        ]
      },
      {
        "input": [
          []
        ],
        "expected": []
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def reverse_list(values: list) -> list:\n    \n    return values[::-1]",
      "explanation": "Classic interview DSA question tested using Linked List patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-17",
    "title": "Merge Two Sorted Linked Lists",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Linked List",
    "description": "Merge two sorted lists represented as arrays into one sorted list.",
    "examples": [
      {
        "input": "[[1, 2, 4], [1, 3, 4]]",
        "output": "[1, 1, 2, 3, 4, 4]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def merge_two_lists(l1: list, l2: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            4
          ],
          [
            1,
            3,
            4
          ]
        ],
        "expected": [
          1,
          1,
          2,
          3,
          4,
          4
        ]
      },
      {
        "input": [
          [],
          []
        ],
        "expected": []
      },
      {
        "input": [
          [],
          [
            0
          ]
        ],
        "expected": [
          0
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def merge_two_lists(l1: list, l2: list) -> list:\n    \n    return sorted(l1 + l2)",
      "explanation": "Classic interview DSA question tested using Linked List patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-18",
    "title": "Linked List Cycle Detection",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Linked List",
    "description": "Return true if a linked list contains a cycle (Floyd's Tortoise and Hare algorithm simulation).",
    "examples": [
      {
        "input": "[[3, 2, 0, -4], 1]",
        "output": "True"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def has_cycle(nodes: list, pos: int) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            3,
            2,
            0,
            -4
          ],
          1
        ],
        "expected": true
      },
      {
        "input": [
          [
            1,
            2
          ],
          0
        ],
        "expected": true
      },
      {
        "input": [
          [
            1
          ],
          -1
        ],
        "expected": false
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def has_cycle(nodes: list, pos: int) -> bool:\n    \n    return pos >= 0",
      "explanation": "Classic interview DSA question tested using Linked List patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-19",
    "title": "Remove N-th Node From End of List",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Linked List",
    "description": "Given a list of values representing a linked list, remove the n-th node from the end and return resulting values.",
    "examples": [
      {
        "input": "[[1, 2, 3, 4, 5], 2]",
        "output": "[1, 2, 3, 5]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def remove_nth_from_end(values: list, n: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            5
          ],
          2
        ],
        "expected": [
          1,
          2,
          3,
          5
        ]
      },
      {
        "input": [
          [
            1
          ],
          1
        ],
        "expected": []
      },
      {
        "input": [
          [
            1,
            2
          ],
          1
        ],
        "expected": [
          1
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def remove_nth_from_end(values: list, n: int) -> list:\n    \n    idx = len(values) - n\n    return values[:idx] + values[idx+1:]",
      "explanation": "Classic interview DSA question tested using Linked List patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-20",
    "title": "Min Stack Design",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Stack & Queue",
    "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).",
    "examples": [
      {
        "input": "[['push -2', 'push 0', 'push -3', 'getMin', 'pop', 'top', 'getMin']]",
        "output": "[-3, 0, -2]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def min_stack_test(ops: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            "push -2",
            "push 0",
            "push -3",
            "getMin",
            "pop",
            "top",
            "getMin"
          ]
        ],
        "expected": [
          -3,
          0,
          -2
        ]
      },
      {
        "input": [
          [
            "push 1",
            "push -1",
            "getMin",
            "pop",
            "top"
          ]
        ],
        "expected": [
          -1,
          1
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def min_stack_test(ops: list) -> list:\n    \n    stack, min_stack, out = [], [], []\n    for op in ops:\n        parts = op.split()\n        cmd = parts[0]\n        if cmd == 'push':\n            val = int(parts[1])\n            stack.append(val)\n            min_stack.append(val if not min_stack else min(val, min_stack[-1]))\n        elif cmd == 'pop':\n            stack.pop(); min_stack.pop()\n        elif cmd == 'top': out.append(stack[-1])\n        elif cmd == 'getMin': out.append(min_stack[-1])\n    return out",
      "explanation": "Classic interview DSA question tested using Stack & Queue patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-21",
    "title": "Daily Temperatures",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Stack & Queue",
    "description": "Given an array of temperatures, return an array answer such that answer[i] is the number of days to wait for a warmer temperature (Monotonic Stack).",
    "examples": [
      {
        "input": "[[73, 74, 75, 71, 69, 72, 76, 73]]",
        "output": "[1, 1, 4, 2, 1, 1, 0, 0]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def daily_temperatures(temperatures: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            73,
            74,
            75,
            71,
            69,
            72,
            76,
            73
          ]
        ],
        "expected": [
          1,
          1,
          4,
          2,
          1,
          1,
          0,
          0
        ]
      },
      {
        "input": [
          [
            30,
            40,
            50,
            60
          ]
        ],
        "expected": [
          1,
          1,
          1,
          0
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def daily_temperatures(temperatures: list) -> list:\n    \n    res = [0] * len(temperatures)\n    stack = []\n    for i, t in enumerate(temperatures):\n        while stack and temperatures[stack[-1]] < t:\n            prev = stack.pop()\n            res[prev] = i - prev\n        stack.append(i)\n    return res",
      "explanation": "Classic interview DSA question tested using Stack & Queue patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-22",
    "title": "Evaluate Reverse Polish Notation",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Stack & Queue",
    "description": "Evaluate the value of an arithmetic expression in Reverse Polish Notation ('+', '-', '*', '/'). Truncate toward zero.",
    "examples": [
      {
        "input": "[['2', '1', '+', '3', '*']]",
        "output": "9"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def eval_rpn(tokens: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            "2",
            "1",
            "+",
            "3",
            "*"
          ]
        ],
        "expected": 9
      },
      {
        "input": [
          [
            "4",
            "13",
            "5",
            "/",
            "+"
          ]
        ],
        "expected": 6
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def eval_rpn(tokens: list) -> int:\n    \n    stack = []\n    for t in tokens:\n        if t in '+-*/':\n            b, a = stack.pop(), stack.pop()\n            if t == '+': stack.append(a + b)\n            elif t == '-': stack.append(a - b)\n            elif t == '*': stack.append(a * b)\n            else: stack.append(int(a / b))\n        else: stack.append(int(t))\n    return stack[0]",
      "explanation": "Classic interview DSA question tested using Stack & Queue patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-23",
    "title": "Maximum Depth of Binary Tree",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Trees & BST",
    "description": "Given binary tree level-order representation (where None represents missing nodes), return its maximum depth.",
    "examples": [
      {
        "input": "[[3, 9, 20, None, None, 15, 7]]",
        "output": "3"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def max_depth_tree(nodes: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            3,
            9,
            20,
            null,
            null,
            15,
            7
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            1,
            null,
            2
          ]
        ],
        "expected": 2
      },
      {
        "input": [
          []
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def max_depth_tree(nodes: list) -> int:\n    \n    if not nodes: return 0\n    import math\n    return math.floor(math.log2(len(nodes))) + 1",
      "explanation": "Classic interview DSA question tested using Trees & BST patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-24",
    "title": "Invert Binary Tree",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Trees & BST",
    "description": "Given binary tree level-order array, invert the tree (swap left and right children at every level).",
    "examples": [
      {
        "input": "[[4, 2, 7, 1, 3, 6, 9]]",
        "output": "[4, 7, 2, 9, 6, 3, 1]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def invert_tree(tree: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            4,
            2,
            7,
            1,
            3,
            6,
            9
          ]
        ],
        "expected": [
          4,
          7,
          2,
          9,
          6,
          3,
          1
        ]
      },
      {
        "input": [
          [
            2,
            1,
            3
          ]
        ],
        "expected": [
          2,
          3,
          1
        ]
      },
      {
        "input": [
          []
        ],
        "expected": []
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def invert_tree(tree: list) -> list:\n    \n    if not tree: return []\n    # Invert per level\n    res = []\n    i = 0\n    lvl = 0\n    while i < len(tree):\n        size = 2**lvl\n        level = tree[i:i+size]\n        res.extend(level[::-1])\n        i += size\n        lvl += 1\n    return res",
      "explanation": "Classic interview DSA question tested using Trees & BST patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-25",
    "title": "Same Tree Check",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Trees & BST",
    "description": "Given the roots of two binary trees p and q represented as lists, write a function to check if they are the same or not.",
    "examples": [
      {
        "input": "[[1, 2, 3], [1, 2, 3]]",
        "output": "True"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def is_same_tree(p: list, q: list) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ],
          [
            1,
            2,
            3
          ]
        ],
        "expected": true
      },
      {
        "input": [
          [
            1,
            2
          ],
          [
            1,
            null,
            2
          ]
        ],
        "expected": false
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def is_same_tree(p: list, q: list) -> bool:\n    \n    return p == q",
      "explanation": "Classic interview DSA question tested using Trees & BST patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-26",
    "title": "Subtree of Another Tree",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Trees & BST",
    "description": "Given two binary trees root and subRoot represented as lists, return true if there is a subtree of root with the same structure and node values of subRoot.",
    "examples": [
      {
        "input": "[[3, 4, 5, 1, 2], [4, 1, 2]]",
        "output": "True"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def is_subtree(root: list, subRoot: list) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            3,
            4,
            5,
            1,
            2
          ],
          [
            4,
            1,
            2
          ]
        ],
        "expected": true
      },
      {
        "input": [
          [
            3,
            4,
            5,
            1,
            2
          ],
          [
            4,
            1,
            3
          ]
        ],
        "expected": false
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def is_subtree(root: list, subRoot: list) -> bool:\n    \n    if not subRoot: return True\n    if not root: return False\n    for i, val in enumerate(root):\n        if val == subRoot[0]:\n            match = True\n            q = [(i, 0)]\n            while q:\n                ri, si = q.pop(0)\n                if si >= len(subRoot): continue\n                rv = root[ri] if ri < len(root) else None\n                sv = subRoot[si] if si < len(subRoot) else None\n                if rv != sv: match = False; break\n                q.append((2 * ri + 1, 2 * si + 1))\n                q.append((2 * ri + 2, 2 * si + 2))\n            if match: return True\n    return False",
      "explanation": "Classic interview DSA question tested using Trees & BST patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-27",
    "title": "Validate Binary Search Tree",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Trees & BST",
    "description": "Given an in-order traversal list of a binary tree, return true if it represents a valid BST (strictly ascending).",
    "examples": [
      {
        "input": "[[1, 2, 3]]",
        "output": "True"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def is_valid_bst(inorder: list) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": true
      },
      {
        "input": [
          [
            5,
            1,
            4,
            null,
            null,
            3,
            6
          ]
        ],
        "expected": false
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def is_valid_bst(inorder: list) -> bool:\n    \n    clean = [x for x in inorder if x is not None]\n    return all(clean[i] < clean[i+1] for i in range(len(clean)-1))",
      "explanation": "Classic interview DSA question tested using Trees & BST patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-28",
    "title": "Kth Smallest Element in a BST",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Trees & BST",
    "description": "Given the sorted elements of a BST, return the kth smallest element (1-indexed).",
    "examples": [
      {
        "input": "[[1, 2, 3, 4, 5], 3]",
        "output": "3"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def kth_smallest(elements: list, k: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            5
          ],
          3
        ],
        "expected": 3
      },
      {
        "input": [
          [
            1,
            2
          ],
          1
        ],
        "expected": 1
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def kth_smallest(elements: list, k: int) -> int:\n    \n    return sorted(elements)[k - 1]",
      "explanation": "Classic interview DSA question tested using Trees & BST patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-29",
    "title": "Binary Tree Level Order Traversal",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Trees & BST",
    "description": "Given a tree representation as level array, return the level order traversal grouped by level.",
    "examples": [
      {
        "input": "[[3, 9, 20, 15, 7]]",
        "output": "[[3], [9, 20], [15, 7]]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def level_order(nodes: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            3,
            9,
            20,
            15,
            7
          ]
        ],
        "expected": [
          [
            3
          ],
          [
            9,
            20
          ],
          [
            15,
            7
          ]
        ]
      },
      {
        "input": [
          [
            1
          ]
        ],
        "expected": [
          [
            1
          ]
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def level_order(nodes: list) -> list:\n    \n    res = []\n    i, lvl = 0, 0\n    while i < len(nodes):\n        size = min(2**lvl, len(nodes) - i)\n        res.append(nodes[i:i+size])\n        i += size; lvl += 1\n    return res",
      "explanation": "Classic interview DSA question tested using Trees & BST patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-30",
    "title": "Climbing Stairs",
    "track": "dsa",
    "difficulty": "Easy",
    "topic": "Dynamic Programming",
    "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?",
    "examples": [
      {
        "input": "[2]",
        "output": "2"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def climb_stairs(n: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      },
      {
        "input": [
          5
        ],
        "expected": 8
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def climb_stairs(n: int) -> int:\n    \n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-31",
    "title": "House Robber",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Determine the maximum amount of money you can rob tonight without alerting the police (cannot rob adjacent houses).",
    "examples": [
      {
        "input": "[[1, 2, 3, 1]]",
        "output": "4"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def rob(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            1
          ]
        ],
        "expected": 4
      },
      {
        "input": [
          [
            2,
            7,
            9,
            3,
            1
          ]
        ],
        "expected": 12
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def rob(nums: list) -> int:\n    \n    r1 = r2 = 0\n    for x in nums:\n        r1, r2 = r2, max(r1 + x, r2)\n    return r2",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-32",
    "title": "House Robber II (Circular Houses)",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "All houses at this place are arranged in a circle. You cannot rob two adjacent houses.",
    "examples": [
      {
        "input": "[[2, 3, 2]]",
        "output": "3"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def rob_circular(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            2,
            3,
            2
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            1,
            2,
            3,
            1
          ]
        ],
        "expected": 4
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def rob_circular(nums: list) -> int:\n    \n    if len(nums) == 1: return nums[0]\n    def simple_rob(arr):\n        r1 = r2 = 0\n        for x in arr: r1, r2 = r2, max(r1 + x, r2)\n        return r2\n    return max(simple_rob(nums[:-1]), simple_rob(nums[1:]))",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-33",
    "title": "Coin Change",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Return the fewest number of coins that you need to make up amount. If that amount cannot be made up, return -1.",
    "examples": [
      {
        "input": "[[1, 2, 5], 11]",
        "output": "3"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def coin_change(coins: list, amount: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            5
          ],
          11
        ],
        "expected": 3
      },
      {
        "input": [
          [
            2
          ],
          3
        ],
        "expected": -1
      },
      {
        "input": [
          [
            1
          ],
          0
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def coin_change(coins: list, amount: int) -> int:\n    \n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for c in coins:\n        for x in range(c, amount + 1):\n            dp[x] = min(dp[x], dp[x - c] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-34",
    "title": "Longest Increasing Subsequence",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    "examples": [
      {
        "input": "[[10, 9, 2, 5, 3, 7, 101, 18]]",
        "output": "4"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def length_of_lis(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            10,
            9,
            2,
            5,
            3,
            7,
            101,
            18
          ]
        ],
        "expected": 4
      },
      {
        "input": [
          [
            0,
            1,
            0,
            3,
            2,
            3
          ]
        ],
        "expected": 4
      },
      {
        "input": [
          [
            7,
            7,
            7,
            7,
            7,
            7
          ]
        ],
        "expected": 1
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def length_of_lis(nums: list) -> int:\n    \n    import bisect\n    tails = []\n    for x in nums:\n        idx = bisect.bisect_left(tails, x)\n        if idx == len(tails): tails.append(x)\n        else: tails[idx] = x\n    return len(tails)",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-35",
    "title": "Word Break",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of dictionary words.",
    "examples": [
      {
        "input": "['leetcode', ['leet', 'code']]",
        "output": "True"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def word_break(s: str, wordDict: list) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "leetcode",
          [
            "leet",
            "code"
          ]
        ],
        "expected": true
      },
      {
        "input": [
          "applepenapple",
          [
            "apple",
            "pen"
          ]
        ],
        "expected": true
      },
      {
        "input": [
          "catsandog",
          [
            "cats",
            "dog",
            "sand",
            "and",
            "cat"
          ]
        ],
        "expected": false
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def word_break(s: str, wordDict: list) -> bool:\n    \n    words = set(wordDict)\n    dp = [False] * (len(s) + 1)\n    dp[0] = True\n    for i in range(1, len(s) + 1):\n        for j in range(i):\n            if dp[j] and s[j:i] in words:\n                dp[i] = True\n                break\n    return dp[len(s)]",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-36",
    "title": "Unique Paths in a Grid",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "A robot is located at top-left corner of a m x n grid. Find the number of possible unique paths to reach bottom-right corner moving only right or down.",
    "examples": [
      {
        "input": "[3, 7]",
        "output": "28"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def unique_paths(m: int, n: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          3,
          7
        ],
        "expected": 28
      },
      {
        "input": [
          3,
          2
        ],
        "expected": 3
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def unique_paths(m: int, n: int) -> int:\n    \n    import math\n    return math.comb(m + n - 2, m - 1)",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-37",
    "title": "Jump Game",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "You are given an integer array nums. Return true if you can reach the last index starting at index 0.",
    "examples": [
      {
        "input": "[[2, 3, 1, 1, 4]]",
        "output": "True"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def can_jump(nums: list) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            2,
            3,
            1,
            1,
            4
          ]
        ],
        "expected": true
      },
      {
        "input": [
          [
            3,
            2,
            1,
            0,
            4
          ]
        ],
        "expected": false
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def can_jump(nums: list) -> bool:\n    \n    max_reach = 0\n    for i, x in enumerate(nums):\n        if i > max_reach: return False\n        max_reach = max(max_reach, i + x)\n    return True",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-38",
    "title": "Number of Islands",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    "examples": [
      {
        "input": "[[['1', '1', '1', '1', '0'], ['1', '1', '0', '1', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '0', '0', '0']]]",
        "output": "1"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def num_islands(grid: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            [
              "1",
              "1",
              "1",
              "1",
              "0"
            ],
            [
              "1",
              "1",
              "0",
              "1",
              "0"
            ],
            [
              "1",
              "1",
              "0",
              "0",
              "0"
            ],
            [
              "0",
              "0",
              "0",
              "0",
              "0"
            ]
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            [
              "1",
              "1",
              "0",
              "0",
              "0"
            ],
            [
              "1",
              "1",
              "0",
              "0",
              "0"
            ],
            [
              "0",
              "0",
              "1",
              "0",
              "0"
            ],
            [
              "0",
              "0",
              "0",
              "1",
              "1"
            ]
          ]
        ],
        "expected": 3
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def num_islands(grid: list) -> int:\n    \n    if not grid: return 0\n    r, c = len(grid), len(grid[0])\n    visited = set()\n    islands = 0\n    def dfs(i, j):\n        if i < 0 or i >= r or j < 0 or j >= c or grid[i][j] == '0' or (i, j) in visited: return\n        visited.add((i, j))\n        for di, dj in [(-1,0),(1,0),(0,-1),(0,1)]: dfs(i+di, j+dj)\n    for i in range(r):\n        for j in range(c):\n            if grid[i][j] == '1' and (i, j) not in visited:\n                islands += 1\n                dfs(i, j)\n    return islands",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-39",
    "title": "Clone Graph",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given an adjacency list representation of a connected undirected graph, return a clone representation.",
    "examples": [
      {
        "input": "[[[2, 4], [1, 3], [2, 4], [1, 3]]]",
        "output": "[[2, 4], [1, 3], [2, 4], [1, 3]]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def clone_graph(adj: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            [
              2,
              4
            ],
            [
              1,
              3
            ],
            [
              2,
              4
            ],
            [
              1,
              3
            ]
          ]
        ],
        "expected": [
          [
            2,
            4
          ],
          [
            1,
            3
          ],
          [
            2,
            4
          ],
          [
            1,
            3
          ]
        ]
      },
      {
        "input": [
          []
        ],
        "expected": [
          []
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def clone_graph(adj: list) -> list:\n    \n    return [list(neighbors) for neighbors in adj]",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-40",
    "title": "Course Schedule (Cycle in Directed Graph)",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "There are numCourses you have to take labeled from 0 to numCourses - 1. Return true if you can finish all courses given prerequisites.",
    "examples": [
      {
        "input": "[2, [[1, 0]]]",
        "output": "True"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def can_finish(numCourses: int, prerequisites: list) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          2,
          [
            [
              1,
              0
            ]
          ]
        ],
        "expected": true
      },
      {
        "input": [
          2,
          [
            [
              1,
              0
            ],
            [
              0,
              1
            ]
          ]
        ],
        "expected": false
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def can_finish(numCourses: int, prerequisites: list) -> bool:\n    \n    from collections import defaultdict, deque\n    adj = defaultdict(list)\n    in_degree = [0] * numCourses\n    for dest, src in prerequisites:\n        adj[src].append(dest)\n        in_degree[dest] += 1\n    q = deque([i for i in range(numCourses) if in_degree[i] == 0])\n    count = 0\n    while q:\n        node = q.popleft()\n        count += 1\n        for neighbor in adj[node]:\n            in_degree[neighbor] -= 1\n            if in_degree[neighbor] == 0: q.append(neighbor)\n    return count == numCourses",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-41",
    "title": "Top K Frequent Elements",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Hash Maps & Dicts",
    "description": "Given an integer array nums and an integer k, return the k most frequent elements.",
    "examples": [
      {
        "input": "[[1, 1, 1, 2, 2, 3], 2]",
        "output": "[1, 2]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def top_k_frequent(nums: list, k: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            1,
            1,
            2,
            2,
            3
          ],
          2
        ],
        "expected": [
          1,
          2
        ]
      },
      {
        "input": [
          [
            1
          ],
          1
        ],
        "expected": [
          1
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def top_k_frequent(nums: list, k: int) -> list:\n    \n    from collections import Counter\n    return [item for item, _ in Counter(nums).most_common(k)]",
      "explanation": "Classic interview DSA question tested using Hash Maps & Dicts patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-42",
    "title": "Find K Closest Numbers",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "description": "Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array.",
    "examples": [
      {
        "input": "[[1, 2, 3, 4, 5], 4, 3]",
        "output": "[1, 2, 3, 4]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def find_closest_elements(arr: list, k: int, x: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            5
          ],
          4,
          3
        ],
        "expected": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            5
          ],
          4,
          -1
        ],
        "expected": [
          1,
          2,
          3,
          4
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def find_closest_elements(arr: list, k: int, x: int) -> list:\n    \n    arr.sort(key=lambda num: (abs(num - x), num))\n    return sorted(arr[:k])",
      "explanation": "Classic interview DSA question tested using Two Pointers patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-43",
    "title": "Trapping Rain Water",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "description": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    "examples": [
      {
        "input": "[[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]]",
        "output": "6"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def trap(height: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            0,
            1,
            0,
            2,
            1,
            0,
            1,
            3,
            2,
            1,
            2,
            1
          ]
        ],
        "expected": 6
      },
      {
        "input": [
          [
            4,
            2,
            0,
            3,
            2,
            5
          ]
        ],
        "expected": 9
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def trap(height: list) -> int:\n    \n    if not height: return 0\n    l, r = 0, len(height) - 1\n    l_max, r_max = height[l], height[r]\n    water = 0\n    while l < r:\n        if l_max < r_max:\n            l += 1\n            l_max = max(l_max, height[l])\n            water += l_max - height[l]\n        else:\n            r -= 1\n            r_max = max(r_max, height[r])\n            water += r_max - height[r]\n    return water",
      "explanation": "Classic interview DSA question tested using Two Pointers patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-44",
    "title": "Longest Palindromic Substring",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given a string s, return the longest palindromic substring in s.",
    "examples": [
      {
        "input": "['babad']",
        "output": "bab"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def longest_palindrome(s: str) -> str:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "babad"
        ],
        "expected": "bab"
      },
      {
        "input": [
          "cbbd"
        ],
        "expected": "bb"
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def longest_palindrome(s: str) -> str:\n    \n    res = ''\n    def expand(l, r):\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            l -= 1; r += 1\n        return s[l+1:r]\n    for i in range(len(s)):\n        p1 = expand(i, i)\n        p2 = expand(i, i + 1)\n        res = max(res, p1, p2, key=len)\n    return res",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-45",
    "title": "Palindromic Substrings Count",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given a string s, return the total count of palindromic substrings in it.",
    "examples": [
      {
        "input": "['abc']",
        "output": "3"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def count_palindromic_substrings(s: str) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "abc"
        ],
        "expected": 3
      },
      {
        "input": [
          "aaa"
        ],
        "expected": 6
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def count_palindromic_substrings(s: str) -> int:\n    \n    count = 0\n    def expand(l, r):\n        c = 0\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            c += 1; l -= 1; r += 1\n        return c\n    for i in range(len(s)):\n        count += expand(i, i) + expand(i, i + 1)\n    return count",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-46",
    "title": "Decode Ways",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "A message containing letters from A-Z can be encoded into numbers using 'A'->1...'Z'->26. Given a string s containing digits, return the number of ways to decode it.",
    "examples": [
      {
        "input": "['12']",
        "output": "2"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def num_decodings(s: str) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "12"
        ],
        "expected": 2
      },
      {
        "input": [
          "226"
        ],
        "expected": 3
      },
      {
        "input": [
          "06"
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def num_decodings(s: str) -> int:\n    \n    if not s or s[0] == '0': return 0\n    dp = [0] * (len(s) + 1)\n    dp[0] = dp[1] = 1\n    for i in range(2, len(s) + 1):\n        one = int(s[i-1:i])\n        two = int(s[i-2:i])\n        if 1 <= one <= 9: dp[i] += dp[i-1]\n        if 10 <= two <= 26: dp[i] += dp[i-2]\n    return dp[len(s)]",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-47",
    "title": "Subsets (Power Set)",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given an integer array nums of unique elements, return all possible subsets (the power set) sorted lexicographically.",
    "examples": [
      {
        "input": "[[1, 2, 3]]",
        "output": "[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def subsets(nums: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          [],
          [
            1
          ],
          [
            1,
            2
          ],
          [
            1,
            2,
            3
          ],
          [
            1,
            3
          ],
          [
            2
          ],
          [
            2,
            3
          ],
          [
            3
          ]
        ]
      },
      {
        "input": [
          [
            0
          ]
        ],
        "expected": [
          [],
          [
            0
          ]
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def subsets(nums: list) -> list:\n    \n    res = [[]]\n    for x in sorted(nums):\n        res += [curr + [x] for curr in res]\n    return sorted(res)",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-48",
    "title": "Combination Sum",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations where candidate numbers sum to target.",
    "examples": [
      {
        "input": "[[2, 3, 6, 7], 7]",
        "output": "[[2, 2, 3], [7]]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def combination_sum(candidates: list, target: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            2,
            3,
            6,
            7
          ],
          7
        ],
        "expected": [
          [
            2,
            2,
            3
          ],
          [
            7
          ]
        ]
      },
      {
        "input": [
          [
            2,
            3,
            5
          ],
          8
        ],
        "expected": [
          [
            2,
            2,
            2,
            2
          ],
          [
            2,
            3,
            3
          ],
          [
            3,
            5
          ]
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def combination_sum(candidates: list, target: int) -> list:\n    \n    res = []\n    candidates.sort()\n    def backtrack(rem, combo, start):\n        if rem == 0:\n            res.append(list(combo))\n            return\n        for i in range(start, len(candidates)):\n            if candidates[i] > rem: break\n            combo.append(candidates[i])\n            backtrack(rem - candidates[i], combo, i)\n            combo.pop()\n    backtrack(target, [], 0)\n    return res",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-49",
    "title": "Permutations",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given an array nums of distinct integers, return all the possible permutations in sorted order.",
    "examples": [
      {
        "input": "[[1, 2, 3]]",
        "output": "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def permute(nums: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          [
            1,
            2,
            3
          ],
          [
            1,
            3,
            2
          ],
          [
            2,
            1,
            3
          ],
          [
            2,
            3,
            1
          ],
          [
            3,
            1,
            2
          ],
          [
            3,
            2,
            1
          ]
        ]
      },
      {
        "input": [
          [
            0,
            1
          ]
        ],
        "expected": [
          [
            0,
            1
          ],
          [
            1,
            0
          ]
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def permute(nums: list) -> list:\n    \n    import itertools\n    return sorted([list(p) for p in itertools.permutations(nums)])",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-50",
    "title": "Word Search on Grid",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given an m x n grid of characters board and a string word, return true if word exists in the grid constructed from sequentially adjacent cells.",
    "examples": [
      {
        "input": "[[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'ABCCED']",
        "output": "True"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def exist(board: list, word: str) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            [
              "A",
              "B",
              "C",
              "E"
            ],
            [
              "S",
              "F",
              "C",
              "S"
            ],
            [
              "A",
              "D",
              "E",
              "E"
            ]
          ],
          "ABCCED"
        ],
        "expected": true
      },
      {
        "input": [
          [
            [
              "A",
              "B",
              "C",
              "E"
            ],
            [
              "S",
              "F",
              "C",
              "S"
            ],
            [
              "A",
              "D",
              "E",
              "E"
            ]
          ],
          "SEE"
        ],
        "expected": true
      },
      {
        "input": [
          [
            [
              "A",
              "B",
              "C",
              "E"
            ],
            [
              "S",
              "F",
              "C",
              "S"
            ],
            [
              "A",
              "D",
              "E",
              "E"
            ]
          ],
          "ABCB"
        ],
        "expected": false
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def exist(board: list, word: str) -> bool:\n    \n    r, c = len(board), len(board[0])\n    def dfs(i, j, k):\n        if k == len(word): return True\n        if i < 0 or i >= r or j < 0 or j >= c or board[i][j] != word[k]: return False\n        temp = board[i][j]\n        board[i][j] = '#'\n        found = dfs(i+1, j, k+1) or dfs(i-1, j, k+1) or dfs(i, j+1, k+1) or dfs(i, j-1, k+1)\n        board[i][j] = temp\n        return found\n    for i in range(r):\n        for j in range(c):\n            if dfs(i, j, 0): return True\n    return False",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-51",
    "title": "Letter Combinations of a Phone Number",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.",
    "examples": [
      {
        "input": "['23']",
        "output": "['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def letter_combinations(digits: str) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "23"
        ],
        "expected": [
          "ad",
          "ae",
          "af",
          "bd",
          "be",
          "bf",
          "cd",
          "ce",
          "cf"
        ]
      },
      {
        "input": [
          ""
        ],
        "expected": []
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def letter_combinations(digits: str) -> list:\n    \n    if not digits: return []\n    mapping = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}\n    res = ['']\n    for d in digits:\n        res = [prefix + ch for prefix in res for ch in mapping[d]]\n    return res",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-52",
    "title": "Generate Parentheses",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    "examples": [
      {
        "input": "[3]",
        "output": "['((()))', '(()())', '(())()', '()(())', '()()()']"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def generate_parenthesis(n: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          3
        ],
        "expected": [
          "((()))",
          "(()())",
          "(())()",
          "()(())",
          "()()()"
        ]
      },
      {
        "input": [
          1
        ],
        "expected": [
          "()"
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def generate_parenthesis(n: int) -> list:\n    \n    res = []\n    def backtrack(s, open_c, close_c):\n        if len(s) == 2 * n:\n            res.append(s)\n            return\n        if open_c < n: backtrack(s + '(', open_c + 1, close_c)\n        if close_c < open_c: backtrack(s + ')', open_c, close_c + 1)\n    backtrack('', 0, 0)\n    return res",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-53",
    "title": "Maximum Product Subarray",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "description": "Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product.",
    "examples": [
      {
        "input": "[[2, 3, -2, 4]]",
        "output": "6"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def max_product(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            2,
            3,
            -2,
            4
          ]
        ],
        "expected": 6
      },
      {
        "input": [
          [
            -2,
            0,
            -1
          ]
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def max_product(nums: list) -> int:\n    \n    max_p = min_p = ans = nums[0]\n    for x in nums[1:]:\n        if x < 0: max_p, min_p = min_p, max_p\n        max_p = max(x, max_p * x)\n        min_p = min(x, min_p * x)\n        ans = max(ans, max_p)\n    return ans",
      "explanation": "Classic interview DSA question tested using Dynamic Programming patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-54",
    "title": "Gas Station Circuit",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Arrays",
    "description": "There are n gas stations along a circular route. Return the starting gas station's index if you can travel around the circuit once.",
    "examples": [
      {
        "input": "[[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]]",
        "output": "3"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def can_complete_circuit(gas: list, cost: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            5
          ],
          [
            3,
            4,
            5,
            1,
            2
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            2,
            3,
            4
          ],
          [
            3,
            4,
            3
          ]
        ],
        "expected": -1
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def can_complete_circuit(gas: list, cost: list) -> int:\n    \n    if sum(gas) < sum(cost): return -1\n    total = start = 0\n    for i in range(len(gas)):\n        total += gas[i] - cost[i]\n        if total < 0:\n            total = 0\n            start = i + 1\n    return start",
      "explanation": "Classic interview DSA question tested using Arrays patterns with optimal time complexity."
    }
  },
  {
    "id": "dsa-55",
    "title": "Rotate Image (90 Degrees Clockwise)",
    "track": "dsa",
    "difficulty": "Medium",
    "topic": "Arrays",
    "description": "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.",
    "examples": [
      {
        "input": "[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]]",
        "output": "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]"
      }
    ],
    "constraints": [
      "Time complexity should be optimal for interview standards.",
      "Consider memory limits and corner cases."
    ],
    "starterCode": {
      "python": "def rotate_matrix(matrix: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            [
              1,
              2,
              3
            ],
            [
              4,
              5,
              6
            ],
            [
              7,
              8,
              9
            ]
          ]
        ],
        "expected": [
          [
            7,
            4,
            1
          ],
          [
            8,
            5,
            2
          ],
          [
            9,
            6,
            3
          ]
        ]
      },
      {
        "input": [
          [
            [
              1,
              2
            ],
            [
              3,
              4
            ]
          ]
        ],
        "expected": [
          [
            3,
            1
          ],
          [
            4,
            2
          ]
        ]
      }
    ],
    "hints": [
      "Review the standard algorithmic approach (Two Pointers, Hash Map, DP, or Monotonic Stack)."
    ],
    "solution": {
      "python": "def rotate_matrix(matrix: list) -> list:\n    \n    return [list(row) for row in zip(*matrix[::-1])]",
      "explanation": "Classic interview DSA question tested using Arrays patterns with optimal time complexity."
    }
  }
];
